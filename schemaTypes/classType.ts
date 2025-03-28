import {defineField, defineType} from 'sanity'

export const classType = defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      return {
        title: title || 'No name',
      }
    },
  },
  fields: [
    defineField({
      name: 'id',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 20,
        slugify: (input) => {
          const slug = input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .substring(0, 20)
          return slug
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the class',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Description of the class',
    }),
  ],
})
