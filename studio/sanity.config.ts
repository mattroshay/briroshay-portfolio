import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// projectId is set by `sanity init` and stored in sanity.cli.ts.
// You can paste it here as well, or read it from env at deploy time.
export default defineConfig({
  name: 'default',
  title: 'Bri Roshay — Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Paintings')
              .child(
                S.documentList()
                  .title('Paintings')
                  .filter('_type == "artwork" && type == "painting"')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.listItem()
              .title('Sculptures')
              .child(
                S.documentList()
                  .title('Sculptures')
                  .filter('_type == "artwork" && type == "sculpture"')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.divider(),
            S.listItem()
              .title('All artwork')
              .child(S.documentTypeList('artwork').title('All artwork')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
