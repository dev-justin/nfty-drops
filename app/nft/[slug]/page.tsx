import { sanity, urlFor } from "../../../util/sanity";

// Get collection from sanity where the url param equals the slug
const getCollection = async (slug: String) => {
  console.log(slug);
  const query = `*[_type == "collection" && slug.current == "${slug}"]{
      title,
      headerImage,
      nftImage,
      smartContractAddress,
    }`;
  const collection = await sanity.fetch(query);
  return collection[0];
};

async function NFTPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collection = await getCollection(slug);
  console.log(collection);

  return (
    <div className="relative h-80 overflow-hidden">
      <h1 className="absolute left-1/2 top-1/2 font-bold text-6xl -translate-x-1/2 -translate-y-1/2 text-gray-800 z-10">
        {collection.title}
      </h1>
      <img
        src={urlFor(collection.headerImage).url()}
        alt={collection.title}
        className="object-cover object-center blur-sm"
      />
    </div>
  );
}

export default NFTPage;
