import {defineField, defineType} from 'sanity'

export const todoItem  = defineType({
    name: "todoItem",
    title: "Todo Item",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "completed",
            title: "Completed",
            type: "boolean",
            initialValue: false,
        }),
    ],
})