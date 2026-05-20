import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true, // published content via CDN; flip to false for previews
});

const builder = imageUrlBuilder(sanityClient);

/** Build a Sanity image URL with on-the-fly transforms. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
