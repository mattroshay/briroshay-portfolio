import {defineType, defineField} from 'sanity'

/**
 * A single-line string with English and French translations.
 * Stored as { en: string, fr: string }.
 */
export default defineType({
  name: 'localeString',
  title: 'Localised string',
  type: 'object',
  fieldsets: [
    {name: 'translations', title: 'Translations', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({name: 'en', title: 'English', type: 'string', fieldset: 'translations'}),
    defineField({name: 'fr', title: 'Français', type: 'string', fieldset: 'translations'}),
  ],
})
