import {defineField, defineType} from 'sanity'

export const userChapterType = defineType({
    name: 'userChapter',
    title: 'User <=> Chapter',
    type: 'document',
    preview: {
        select: {
          title: 'userId.name',
        },
        prepare({title}) {
          return {
            title: (title || 'No name') + ' - Chapter Relation',
          }
        },
      },
      fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{type: 'user'}],
            validation: (Rule) => Rule.required(),
            description: 'Name of the class',
        }),
        defineField({
            name: "chapterId",
            title: "Chapter ID",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{type: "chapter"}],
                },
            ],
            validation: (Rule) => Rule.required(),
            description: "Chapter ID for this chapter",
        }),
      ]
})
