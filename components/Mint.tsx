"use client";

import Image from "next/image";
import { useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useAddress } from "@thirdweb-dev/react";
import toast, { Toaster } from "react-hot-toast";

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Mint({
  nftImage,
  nftContract,
  nftTitle,
}: {
  nftImage: string;
  nftContract: string;
  nftTitle: string;
}) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const address = useAddress();
  const { contract } = useContract(nftContract, "nft-drop");

  const [totalSupply, setTotalSupply] = useState<number>();
  const [claimed, setClaimed] = useState<number>();
  const [price, setPrice] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const getSupply = async () => {
    await Promise.all([
      contract?.totalSupply(),
      contract?.totalClaimedSupply(),
      contract?.claimConditions.getAll(),
    ]).then((values) => {
      setTotalSupply(Number(values[0]));
      setClaimed(Number(values[1]));
      setPrice(values[2]?.[0].currencyMetadata.displayValue);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (contract) {
      getSupply();
    }
  }, [contract]);

  const mintNft = async () => {
    toast.loading("Minting NFT...");
    setLoading(true);
    if (!address || !contract) return;
    const quantity = 1;
    contract.interceptor.overrideNextTransaction(() => ({
      gasLimit: 800000,
    }));
    contract
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // the transaction receipt
        const claimedTokenId = tx[0].id; // the id of the NFT claimed
        const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
        console.log(claimedNFT);
        toast.success("NFT Minted!");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Error minting NFT");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <Toaster />
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.to(trans) }}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-green-300 p-1 shadow-xl shadow-blue-400 transition-shadow duration-500 ">
          <div className="relative w-[400px] h-[500px]">
            <Image
              src={nftImage}
              fill={true}
              alt="NFT Display Image"
              className=" object-cover"
            />
            <div className="relative z-10 flex justify-end flex-col items-end h-full group">
              <div className="bg-gray-800/80 backdrop-blur-sm w-full group-hover:bg-gray-800/100 transition duration-300">
                <div className="flex justify-center items-center py-8 px-4 gap-4 flex-col">
                  <h3 className="text-3xl font-bold uppercase inline-flex">
                    {nftTitle}
                  </h3>
                  {loading && (
                    <div className="h-12 w-12 relative">
                      <Image
                        src="/assets/three-dots.svg"
                        alt="Loading indicator"
                        fill={true}
                      />
                    </div>
                  )}
                  {!loading && <p>{`Claimed: ${claimed}/${totalSupply}`}</p>}
                  <button
                    className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-lg hover:opacity-70 transition duration-300 ease-out w-full disabled:opacity-30"
                    disabled={loading || address === undefined}
                    onClick={mintNft}
                  >
                    {(address === undefined && "Wallet Not Connected") ||
                      (!loading && `Mint for ${price} ETH`) ||
                      "Loading..."}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default Mint;
