import {defineField, defineType} from 'sanity'

export const resourceObject = defineType({
  name: 'resourceType',
  title: 'Resource Type',
  type: 'object',
  fields: [
   
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
      type: 'array',
      of: [
        {
          type: 'url',
          title: 'Video URL',
          description: 'URL of the video',
          validation: (Rule) => Rule.uri({scheme: ['https', 'http']}),
        },
      ],
      
      description: 'Video URL of the resource type',
    }),
  ],
})
