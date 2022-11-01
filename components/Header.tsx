import { BsDropletHalf } from "react-icons/bs";
import Link from "next/link";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";

function Header() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  console.log(address);
  return (
    <header className="border-b border-white/10">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-white items-center gap-2 inline-flex group"
          >
            <BsDropletHalf className="text-3xl group-hover:text-blue-400 transition-all duration-300 ease-out" />
            <span className="text-2xl font-bold group-hover:text-white/90 transition-all duration-300 ease-out">
              NFTY Drops
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/nft/LilBots" className="text-white">
                LilBots
              </Link>
            </li>
            <li>
              <Link href="/nft/SpacePunks" className="text-white">
                Space Punks
              </Link>
            </li>
          </ul>

          <button
            className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-md hover:opacity-70 transition duration-300 ease-out"
            onClick={() => (address ? disconnect() : connectWithMetamask())}
          >
            {address ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Disconnect:</span>
                <span className="text-xs pt-1">
                  {address.substring(0, 5)}...
                  {address.substring(address.length - 4)}
                </span>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
