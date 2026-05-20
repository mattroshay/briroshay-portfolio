import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  groups: [
    {name: 'main', title: 'Main', default: true},
    {name: 'commerce', title: 'Sale'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ── Main ────────────────────────────────────────────────────────
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'main',
      options: {
        list: [
          {title: 'Painting', value: 'painting'},
          {title: 'Sculpture', value: 'sculpture'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'localeSlug',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'main',
      description: 'Add one or more photos. Mark one as primary — it’s shown in the gallery card.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt text', type: 'localeString'},
            {name: 'isPrimary', title: 'Primary image', type: 'boolean', initialValue: false},
          ],
          preview: {
            select: {imageUrl: 'asset.url', title: 'alt.en'},
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'dateCreated',
      title: 'Date created',
      type: 'date',
      group: 'main',
      options: {dateFormat: 'YYYY-MM-DD'},
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      group: 'main',
      fields: [
        {name: 'width', title: 'Width', type: 'number', validation: (R) => R.required().positive()},
        {
          name: 'height',
          title: 'Height',
          type: 'number',
          validation: (R) => R.required().positive(),
        },
        {
          name: 'depth',
          title: 'Depth (sculptures)',
          type: 'number',
          validation: (R) => R.positive(),
        },
        {
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {list: ['cm', 'in']},
          initialValue: 'cm',
        },
      ],
    }),
    defineField({
      name: 'mediumCategory',
      title: 'Medium category',
      type: 'string',
      group: 'main',
      description: 'Used to filter the paintings gallery. Leave blank for sculptures.',
      options: {
        list: [
          {title: 'Oil', value: 'oil'},
          {title: 'Acrylic', value: 'acrylic'},
          {title: 'Watercolour', value: 'watercolour'},
          {title: 'Mixed media', value: 'mixed_media'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      hidden: ({document}) => document?.type === 'sculpture',
    }),
    defineField({
      name: 'mediumDetails',
      title: 'Medium (free text)',
      type: 'localeString',
      group: 'main',
      description: 'e.g. "Oil on linen", "Bronze, patinated"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      group: 'main',
    }),

    // ── Commerce (phase 3) ─────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'commerce',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Sold', value: 'sold'},
          {title: 'Reserved', value: 'reserved'},
          {title: 'Not for sale', value: 'not_for_sale'},
        ],
        layout: 'radio',
      },
      initialValue: 'not_for_sale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      group: 'commerce',
      fields: [
        {name: 'amount', title: 'Amount', type: 'number', validation: (R) => R.positive()},
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {list: ['EUR']},
          initialValue: 'EUR',
        },
      ],
      hidden: ({document}) =>
        document?.status === 'not_for_sale' || document?.status === 'sold',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (kg)',
      type: 'number',
      group: 'commerce',
      description: 'For shipping calculations later. Mostly relevant for sculptures.',
    }),

    // ── SEO ────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'localeString',
      group: 'seo',
      description: 'Override the default page title for search engines.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'localeText',
      group: 'seo',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home page',
      type: 'boolean',
      group: 'main',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'main',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Oldest first',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'type',
      media: 'images.0.asset',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? subtitle[0].toUpperCase() + subtitle.slice(1) : '',
        media,
      }
    },
  },
})
