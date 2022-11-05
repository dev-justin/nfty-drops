"use client";

import Link from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState } from "react";

interface collection {
  title: string;
  slug: {
    current: string;
  };
}

function MobileNavLinks({ collections }: { collections: collection[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <HiMenuAlt4
        className="text-white text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full z-50">
          <ul className="bg-black mx-8 my-2 rounded-md p-4 flex gap-8 shadow-lg justify-center">
            {collections.map((collection: { slug: any; title: string }) => (
              <li key={collection.slug.current}>
                <Link
                  href={`/nft/${collection.slug.current}`}
                  className="text-white hover:text-white/90 transition-all duration-300 ease-out"
                  onClick={() => setIsOpen(false)}
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileNavLinks;
