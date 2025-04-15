import {defineField, defineType} from 'sanity'

export const soalObject = defineType({
  name: 'soalType',
  title: 'Soal Type',
  type: 'document',
  fields: [
    
    defineField({
      name: 'pertanyaan',
      title: 'Pertanyaan',
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
      name: 'pilihanGanda',
      title: 'Pilihan Ganda',
      type: 'array',
      of: [
        {
          type: 'optionAnswerType',
        },
      ],
      
      description: 'Pilihan ganda dari soal, jika kosongan maka soal adalah essay',
      validation: (Rule) => Rule.unique()
    }),
  ],
})
