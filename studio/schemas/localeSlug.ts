import {defineType, defineField} from 'sanity'

/**
 * A slug with English and French variants. The English slug is what we
 * route on at build time; French is optional and shown in the URL only
 * when we add French-localised URL paths later.
 */
export default defineType({
  name: 'localeSlug',
  title: 'Localised slug',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc.title?.en || '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fr',
      title: 'Slug français',
      type: 'slug',
      options: {
        source: (doc: any) => doc.title?.fr || doc.title?.en || '',
        maxLength: 96,
      },
    }),
  ],
})
