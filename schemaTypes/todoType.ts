import {defineField, defineType} from 'sanity'

export const todoType = defineType({
    name: 'todoType',
    title: 'Todo',
    type: 'document',
    preview: {
        select: {
            title: 'userId.name',
            chapter: 'chapter.name',
        },
        prepare({title, chapter}) {
            return {
                title: title || 'No name' + ' - Todo',
                subtitle: chapter || 'No chapter',
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
            to: [{type: "chapter"}],
            validation: (Rule) => Rule.required(),
            description: 'Chapter ID for this todo',
        }),
        defineField({
            name: 'todo',
            title: 'Todo',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'todoItem'}],
                },
            ],
            description: 'Todo ID for this chapter',
        }),
    ],
})
