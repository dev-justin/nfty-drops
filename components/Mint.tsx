"use client";

import Image from "next/image";
import { useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
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
  const { contract } = useContract(nftContract);
  console.log(contract?.metadata);

  const [claimable, setClaimable] = useState<number>();
  const [claimed, setClaimed] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   if (!contract) return;
  //   const getNFTCount = async () => {
  //     const claimedNFTCount = await contract.totalClaimedSupply();
  //     const unclaimedNFTCount = await contract.totalUnclaimedSupply();
  //     setClaimed(BigNumber.from(claimedNFTCount).toNumber());
  //     setClaimable(BigNumber.from(unclaimedNFTCount).toNumber() + claimed);
  //   };
  //   getNFTCount();
  //   setLoading(false);
  // }, [contract]);

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.to(trans) }}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center shadow-lg bg-gradient-to-r from-blue-400 to-green-300 p-1 hover:shadow-xl hover:shadow-blue-400 transition-shadow duration-500 ">
          <div className="relative w-[600px] h-[400px]">
            <div className="relative z-10 flex justify-end flex-col items-end h-full">
              <div className="bg-white/20 backdrop-blur-sm w-full text-gray-800">
                <div className="flex justify-center items-center py-8 px-4 gap-8 flex-col">
                  <h3 className="text-3xl font-bold uppercase inline-flex">
                    {nftTitle}
                  </h3>
                  <button className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-lg hover:opacity-70 transition duration-300 ease-out ">
                    Mint
                  </button>
                </div>
              </div>
            </div>
            <Image
              src={nftImage}
              fill={true}
              alt="NFT Display Image"
              className=" object-cover"
            />
          </div>
          {/* <h3 className="text-2xl font-bold uppercase inline-flex">
            {nftTitle}
          </h3> */}
          {/* {!loading && (
          <div>
            <p>
              Supply: {claimed}/{claimable}
            </p>
          </div>
        )} */}
          {/* <button className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-lg hover:opacity-70 transition duration-300 ease-out w-full">
            Mint
          </button> */}
        </div>
      </animated.div>
    </div>
  );
}

export default Mint;
