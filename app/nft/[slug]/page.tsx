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
    <section className="flex flex-col justify-center items-center gap-12">
      <div>
        <Mint
          nftImage={urlFor(collection.nftImage).url()}
          nftContract={collection.smartContractAddress}
          nftTitle={collection.title}
        />
      </div>
      <div className="max-w-sm bg-white/20 p-4 text-center rounded-lg shadow-lg backdrop-blur-sm border border-blue-400">
        <p className="text-sm text-white/70">
          This NFT collection is on the Goerli test network. Want to mint for
          free? Grab your Goerli{" "}
          <a
            href="https://goerlifaucet.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 font-bold hover:text-green-300 transition-all duration-300"
          >
            here
          </a>
        </p>
        <p className="text-xs text-white/50 pt-4">Note: only 1 per wallet</p>
      </div>
    </section>
  );
}

export default Page;
