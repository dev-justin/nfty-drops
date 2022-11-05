"use client";

import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";

function NavConnect() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectWithMetamask = useMetamask();
  return (
    <button
      className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-md hover:opacity-70 transition duration-300 ease-out"
      onClick={() => (address ? disconnect() : connectWithMetamask())}
    >
      {address ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">Logout</span>
          <span className="text-sm hidden sm:inline-block">
            {address.substring(0, 5)}...
            {address.substring(address.length - 4)}
          </span>
        </div>
      ) : (
        <>
          <span className="hidden sm:block">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </>
      )}
    </button>
  );
}

export default NavConnect;
