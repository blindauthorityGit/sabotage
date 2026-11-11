'use client';

import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cvif55we';
const singletonTypes = ['page', 'siteSettings'];

export default defineConfig({
  name: 'default',
  title: 'SABOTAGE QCQC? — Content Studio',
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) => S.list()
        .title('SABOTAGE QCQC?')
        .items([
          S.listItem()
            .title('Homepage')
            .id('homepage')
            .child(S.document().schemaType('page').documentId('home').title('Homepage')),
          S.listItem()
            .title('Website-Einstellungen')
            .id('websiteSettings')
            .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Website-Einstellungen')),
          S.divider(),
          ...S.documentTypeListItems().filter((item) => !singletonTypes.includes(item.getId() || '')),
        ]),
    }),
  ],
  schema: {types: schemaTypes},
});
