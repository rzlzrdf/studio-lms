import {defineField, defineType} from 'sanity'


export const userType = defineType({
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Name of the user",
        }),
    ]
})