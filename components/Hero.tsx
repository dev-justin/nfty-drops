import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { sanity } from "../util/sanity";

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R;
}

const getCollections = async () => {
  const query = `*[_type == "collection"]{
    title,
    slug,
  }`;
  const collections = await sanity.fetch(query);
  return collections;
};

const Hero = asyncComponent(async () => {
  const collections = await getCollections();
  return (
    <div className="flex py-12 gap-12 px-8 flex-col-reverse">
      <div className="flex flex-col items-center gap-8 flex-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-l from-blue-400 to-green-300 bg-clip-text text-transparent text-center py-2">
          Grow your digital art collection.
        </h1>
        <p className="text-base md:text-xl text-center">
          Expand your NFT collection. Mint one of our collections below!
        </p>

        <div className="flex items-center gap-6 sm:gap-8 sm:pt-4 flex-wrap justify-center">
          {collections.map((collection: { slug: any; title: string }) => (
            <Link
              href={`/nft/${collection.slug.current}`}
              key={collection.slug.current}
              className="border px-5 py-2 rounded-full flex items-center gap-4 hover:bg-white hover:text-gray-900 transition-all duration-300 ease-out group whitespace-nowrap"
            >
              <span>{collection.title}</span>
              <BsArrowRight className="group-hover:animate-pulse" />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/assets/images/FeaturedA3.avif"
            width={200}
            height={200}
            alt="Image showing artwork"
            className="object-cover aspect-[3/5] object-center rounded-lg shadow-md scale-75 opacity-70 blur-sm"
          />
          <Image
            src="/assets/images/FeaturedA1.avif"
            width={200}
            height={200}
            alt="Image showing artwork"
            className="object-cover aspect-[3/5] object-center rounded-lg shadow-md"
          />
          <Image
            src="/assets/images/FeaturedA2.avif"
            width={200}
            height={200}
            alt="Image showing artwork"
            className="object-cover aspect-[3/5] object-center rounded-lg shadow-md scale-75 opacity-70 blur-sm"
          />
        </div>
      </div>
    </div>
  );
});

export default Hero;
