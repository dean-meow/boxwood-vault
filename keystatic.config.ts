import { config, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  singletons: {
    database: singleton({
      label: 'Vault Database',
      path: 'wallpapers',
      format: { data: 'json' },
      schema: {
        categories: fields.array(
          fields.object({
            id: fields.text({ 
              label: 'Category ID', 
              validation: { 
                length: { min: 2 }, 
                match: { regex: /^[a-z0-9-]+$/, message: 'Lowercase letters, numbers, and hyphens only.' } 
              } 
            }),
            display_name: fields.text({ label: 'Display Name' }),
            sort_order: fields.integer({ label: 'Sort Order' }),
            is_active: fields.checkbox({ label: 'Is Active', defaultValue: true })
          }),
          { label: 'Categories', itemLabel: props => props.fields.display_name.value }
        ),
        assets: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            slug: fields.text({ 
              label: 'Slug', 
              validation: { match: { regex: /^[a-z0-9-]+$/, message: 'Lowercase letters, numbers, and hyphens only.' } } 
            }),
            collections: fields.array(
              fields.text({ 
                label: 'Category ID (Must exactly match an ID above)',
                validation: { match: { regex: /^[a-z0-9-]+$/, message: 'Lowercase letters, numbers, and hyphens only.' } }
              }),
              { label: 'Assigned Categories' }
            ),
            apparel_type: fields.text({ label: 'Apparel Type (e.g., HOODIE)' }),
            apparel_thumbnail: fields.image({ 
              label: 'Apparel Thumbnail', 
              directory: 'images/apparel', 
              publicPath: '/images/apparel' 
            }),
            purchase_url: fields.url({ label: 'Purchase URL' }),
            base_image_url: fields.url({ 
              label: 'Cloudinary Base URL',
              validation: { 
                match: { 
                  regex: /\/upload\//, 
                  message: 'The URL must contain the /upload/ directory.' 
                } 
              } 
            }),
            gravity: fields.select({
              label: 'Crop Gravity',
              defaultValue: 'auto',
              options: [
                { label: 'Auto (Subject Focus)', value: 'auto' },
                { label: 'Center (Geometric)', value: 'center' }
              ]
            })
          }),
          { label: 'Vault Catalog', itemLabel: props => props.fields.title.value }
        )
      }
    })
  }
});
