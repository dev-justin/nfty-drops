import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Image from "next/image";

export default function RevealModal({ nftImage }: { nftImage: string }) {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden shadow-xl transition-all bg-gradient-to-r from-blue-400 to-green-300 p-1 max-w-xl w-full">
                <div className="flex flex-col justify-center items-center bg-gray-800 p-8 gap-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">NFT Minted</h3>
                    <BsFillPatchCheckFill className="text-xl text-green-300" />
                  </div>
                  <div className="relative w-full aspect-square border-2 rounded-lg overflow-clip shadow-xl">
                    <Image
                      src={nftImage}
                      fill={true}
                      alt="NFT Image"
                      className=" object-contain"
                    />
                  </div>
                  <button
                    className="text-gray-900 font-bold px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-300 shadow-md hover:opacity-70 transition duration-300 ease-out w-full"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
