"use client";

import Image from "next/image";
import { useContract } from "@thirdweb-dev/react";

function Mint({
  nftImage,
  nftContract,
}: {
  nftImage: string;
  nftContract: string;
}) {
  const { contract } = useContract(
    "0xcbc5803A29E31B78a7Fc237CDe0eFf1659213Cc5",
    "nft-drop"
  );
  console.log(nftContract, nftImage);
  return (
    <div className="flex gap-8 py-8">
      <div className="grow">left</div>
      <div className="grow flex">
        <div className="relative h-full w-full">
          {/* <Image
            src={nftImage}
            alt="nft"
            fill={true}
            className="object-cover"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Mint;
