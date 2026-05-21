import { sanityClient } from './sanity';
import type { Artwork, ArtworkType } from './types';

/**
 * Centralised GROQ queries. Keep these in one file so we can audit
 * and version the read shape easily.
 *
 * All functions gracefully return empty results when sanityClient is
 * null (no project ID configured), so pages render their empty states
 * cleanly during initial setup.
 */

const ARTWORK_FIELDS = /* groq */ `
  _id,
  _createdAt,
  _updatedAt,
  type,
  title,
  "slug": slug,
  images[]{
    _key,
    asset,
    alt,
    isPrimary,
    hotspot,
    crop
  },
  dateCreated,
  dimensions,
  mediumCategory,
  mediumDetails,
  description,
  status,
  price,
  weight,
  seoTitle,
  seoDescription,
  featured,
  publishedAt
`;

export async function getAllArtworks(): Promise<Artwork[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    /* groq */ `*[_type == "artwork" && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
      ${ARTWORK_FIELDS}
    }`
  );
}

export async function getArtworksByType(type: ArtworkType): Promise<Artwork[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    /* groq */ `*[_type == "artwork" && type == $type && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
      ${ARTWORK_FIELDS}
    }`,
    { type }
  );
}

export async function getFeaturedArtworks(limit = 6): Promise<Artwork[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    /* groq */ `*[_type == "artwork" && featured == true && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {
      ${ARTWORK_FIELDS}
    }`,
    { limit }
  );
}

/**
 * Fetch a single artwork by its localised slug.
 * We accept slug + locale because slugs may differ per language later.
 */
export async function getArtworkBySlug(
  slug: string,
  locale: 'en' | 'fr'
): Promise<Artwork | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    /* groq */ `*[_type == "artwork" && slug[$locale].current == $slug && !(_id in path("drafts.**"))][0] {
      ${ARTWORK_FIELDS}
    }`,
    { slug, locale }
  );
}
