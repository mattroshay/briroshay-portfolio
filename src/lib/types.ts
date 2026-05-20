import type { Locale } from '../i18n/utils';

export type ArtworkType = 'painting' | 'sculpture';

export type MediumCategory =
  | 'oil'
  | 'acrylic'
  | 'watercolour'
  | 'mixed_media'
  | 'other';

export type ArtworkStatus =
  | 'available'
  | 'sold'
  | 'reserved'
  | 'not_for_sale';

export type LocalisedString = Partial<Record<Locale, string>>;

export interface SanityImage {
  _key?: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: LocalisedString;
  isPrimary?: boolean;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface ArtworkDimensions {
  width: number;
  height: number;
  depth?: number;
  unit: 'cm' | 'in';
}

export interface ArtworkPrice {
  amount: number;
  currency: 'EUR';
}

export interface Artwork {
  _id: string;
  _createdAt: string;
  _updatedAt: string;

  type: ArtworkType;
  title: LocalisedString;
  slug: LocalisedString; // localised slugs (currentSlug.en, .fr)
  images: SanityImage[];
  dateCreated?: string; // ISO date
  dimensions?: ArtworkDimensions;

  mediumCategory?: MediumCategory; // only meaningful for paintings
  mediumDetails?: LocalisedString;

  description?: LocalisedString; // plain text for now; promote to block content later

  status: ArtworkStatus;
  price?: ArtworkPrice;
  weight?: number;

  seoTitle?: LocalisedString;
  seoDescription?: LocalisedString;

  featured?: boolean;
  publishedAt?: string;
}
