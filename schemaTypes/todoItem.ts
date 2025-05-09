import {defineField, defineType} from 'sanity'

export const todoItem  = defineType({
    name: "todoItem",
    title: "Todo Item",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "isCompleted",
            title: "is Completed",
            type: "boolean",
            initialValue: false,
        }),
    ],
})