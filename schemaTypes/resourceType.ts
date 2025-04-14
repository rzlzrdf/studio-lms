import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resourceType',
  title: 'Resource Type',
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
      description: 'Name of the resource type',
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'reference',
      to: [{type: 'chapter'}],
      validation: (Rule) => Rule.required(),
      description: 'Related to chapter',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [
        {
          type: 'block',
          options: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
        {
          type: 'image',
        },
        {
          type: 'code',
          name: 'cpode',
          title: 'Code Block',
        },
      ],
      description: 'Overview of the resource type',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      description: 'PDF file of the resource type',
    }),
    defineField({
      name: 'gdrive',
      title: 'Google Drive',
      type: 'url',
      description: 'Google Drive URL of the resource type',
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'url',
      description: 'Video URL of the resource type',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
  ],
})
