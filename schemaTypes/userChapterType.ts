import {defineField, defineType} from 'sanity'

export const userChapterType = defineType({
    name: 'userChapter',
    title: 'User <=> Chapter',
    type: 'document',
    preview: {
        select: {
            title: 'userId.name',
            chapter: 'chapterId.name',
        },
        prepare({title, chapter}) {
            return {
                title: (title || 'No name') + ' - Chapter Relation',
                subtitle: `Chapter : ${chapter || 'No name'}`,
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
            name: 'chapterId',
            title: 'Chapter ID',
            type: 'reference',
            to: [{type: 'chapter'}],
            validation: (Rule) => Rule.required(),
            description: 'Chapter ID for this chapter',
        }),
        defineField({
            name: 'soalId',
            title: 'Soal ID',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'soal', type: 'reference', to: [{type: 'soalType'}]}, // Reference to the soalType
                        {name: 'jawaban', type: 'string'}, // Jawaban for the soal
                        {
                            name: 'file',
                            type: 'file',
                            options: {
                                maxSize: 10 * 1024 * 1024, // 10 MB
                                accept: 'application/zip, application/rar, image/*',
                            },
                        },
                        {
                          name: 'score',
                          type: 'number',
                        },
                        {
                          name: 'feedback',
                          type: 'text',
                          options: {
                            maxLength: 200,
                            placeholder: 'Feedback for the user',
                            rows: 3,
                          },
                        }
                    ],
                    preview: {
                        select: {
                            title: 'soal.pertanyaan',
                        },
                        prepare(selection) {
                            const {title} = selection
                            const block = title?.find(
                                (block: {_type: string}) => block._type === 'block',
                            )
                            const previewText = block
                                ? block.children
                                      ?.map((child: {text: any}) => child.text)
                                      .join('') || 'No text'
                                : 'No content'
                            return {
                                title: previewText || 'No name',
                            }
                        },
                    },
                },
            ],
        }),
    ],
})
