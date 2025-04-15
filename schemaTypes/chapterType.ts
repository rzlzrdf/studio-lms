import {defineField, defineType} from 'sanity'

export const chapterType = defineType({
  name: 'chapter',
  title: 'Chapter',
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
      description: 'Deskripsi bab akan ditampilkan pada accordion materi',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'resourceType',
      description: 'Materi yang ada pada bab ini',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'soal',
      title: 'Soal',
      type: 'array',
      of: [
        {
          type: 'soalType',
        },
      ],
      description: 'Soal yang ada pada bab ini',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
