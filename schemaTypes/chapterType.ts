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
        // defineField({
        //   name: 'soal',
        //   title: 'Soal',
        //   type: 'array',
        //   of: [
        //     {
        //       type: "reference",
        //       to: [{type: 'soalType'}],
        //     },
        //   ],
        //   description: 'Soal yang ada pada bab ini',
        //   validation: (Rule) => Rule.required(),
        // }),
        defineField({
            name: 'asignmentMode',
            title: 'Asignment Mode',
            type: 'boolean',
            initialValue: false,
        }),

        defineField({
            name: 'soalSingle',
            title: 'Soal (Single)',
            type: 'reference',
            to: [{type: 'soalType'}],
            hidden: ({parent}) => parent?.asignmentMode === true,
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    if (context.parent?.asignmentMode === false && !value) {
                        return 'Soal is required when Asignment Mode is false'
                    }
                    return true
                }),
        }),

        defineField({
            name: 'soalMultiple',
            title: 'Soal (Multiple)',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'soalType'}]}],
            hidden: ({parent}) => parent?.asignmentMode === false,
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    if (context.parent?.asignmentMode === true && (!value || value.length === 0)) {
                        return 'At least one soal is required when Asignment Mode is true'
                    }
                    return true
                }),
        }),
    ],
})
