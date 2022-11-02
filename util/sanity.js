import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2021-03-25",
});

const urlFor = (source) => createImageUrlBuilder(sanity).image(source);

// Export urlFor and sanity
export { urlFor, sanity };
