import { BsDropletHalf } from "react-icons/bs";
import Link from "next/link";
import NavLinks from "./NavLinks";
import NavConnect from "./NavConnect";

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between md:px-8">
        <div>
          <Link
            href="/"
            className="text-white items-center gap-2 inline-flex group"
          >
            <BsDropletHalf className="text-3xl group-hover:text-blue-400 transition-all duration-300 ease-out" />
            <span className="text-2xl font-bold group-hover:text-white/90 transition-all duration-300 ease-out hidden sm:inline-block">
              NFTY Drops
            </span>
          </Link>
        </div>
        <div className="flex items-center sm:gap-8 gap-4">
          <NavLinks />
          <NavConnect />
        </div>
      </div>
    </header>
  );
}

export default Header;
