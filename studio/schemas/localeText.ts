import {defineType, defineField} from 'sanity'

/**
 * A multi-line text field with English and French translations.
 */
export default defineType({
  name: 'localeText',
  title: 'Localised text',
  type: 'object',
  fieldsets: [
    {name: 'translations', title: 'Translations', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
  ],
})
