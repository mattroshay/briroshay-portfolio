import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-01-01';

/**
 * The Sanity client. Null when no project ID is configured yet — this lets
 * the site render with empty content during initial setup (before `sanity init`).
 */
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

if (!sanityClient && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[sanity] PUBLIC_SANITY_PROJECT_ID is not set — content fetches will return empty arrays. ' +
      'Run `cd studio && npx sanity@latest init --env`, then copy the project ID into .env.'
  );
}

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Build a Sanity image URL with on-the-fly transforms. Returns a stub when client is unconfigured. */
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return an object with the same chainable shape so callers don't crash.
    // The final .url() returns an empty string.
    const chain: any = new Proxy(
      {},
      {
        get: (_, prop) => (prop === 'url' ? () => '' : () => chain),
      }
    );
    return chain;
  }
  return builder.image(source);
}
