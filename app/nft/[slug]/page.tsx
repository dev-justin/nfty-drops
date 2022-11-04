import Image from "next/image";
import { notFound } from "next/navigation";
import Mint from "../../../components/Mint";
import { sanity, urlFor } from "../../../util/sanity";

// Get collection from sanity where the url param equals the slug
const getCollection = async (slug: string) => {
  const query = `*[_type == "collection" && slug.current == "${slug}"]{
      title,
      headerImage,
      nftImage,
      smartContractAddress,
    }`;
  const collection = await sanity.fetch(query);
  return collection[0];
};

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <section className="flex flex-col">
      {/* <div className="relative h-[200px] rounded-xl overflow-hidden border-4 border-white/10">
        <Image
          src={urlFor(collection.headerImage).url()}
          alt={collection.title}
          className="object-cover"
          fill={true}
        />
        <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 shadow-xl rounded-full">
          <h1 className=" bg-gradient-to-r from-blue-400 to-green-300 px-8 py-4 pb-6 rounded-xl bg-clip-text text-transparent text-6xl font-thin">
            {collection.title}
          </h1>
        </div>
      </div> */}
      <div>
        <Mint
          nftImage={urlFor(collection.nftImage).url()}
          nftContract={collection.smartContractAddress}
          nftTitle={collection.title}
        />
      </div>
    </section>
  );
}

export default Page;
