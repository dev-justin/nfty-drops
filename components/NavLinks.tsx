import sanity from "../util/sanity";
import Link from "next/link";

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

const NavLinks = asyncComponent(async () => {
  const collections = await getCollections();
  return (
    <ul className="flex items-center gap-4">
      {collections.map((collection: { slug: any; title: string }) => (
        <li key={collection.slug.current}>
          <Link
            href={`/nft/${collection.slug.current}`}
            className="text-white hover:text-white/90 transition-all duration-300 ease-out"
          >
            {collection.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default NavLinks;
