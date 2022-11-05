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
