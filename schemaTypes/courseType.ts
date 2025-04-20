import {defineField, defineType} from 'sanity'

export const courseType = defineType({
    name: 'course',
    title: 'Course',
    type: 'document',
    preview: {
        select: {
            title: 'name',
            class: 'class.name',
        },
        prepare({title, class: className}) {
            return {
                title: title || 'No name' + ' - ',
                subtitle: className || 'No class',
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
            description: 'Description of the class',
        }),
        defineField({
            name: 'class',
            title: 'Class',
            type: 'reference',
            to: [{type: 'class'}],
            validation: (Rule) => Rule.required(),
            description: 'Class for this course',
        }),
        defineField({
            name: 'teacher',
            title: 'Teacher',
            type: 'reference',
            to: [{type: 'user'}],
            options: {
                filter: `role in ['admin', 'teacher']`,
            },
            validation: (Rule) =>
                Rule.required().custom(async (value, context) => {
                    if (!value || !value._ref) return 'Teacher is required'

                    // Fetch the referenced user document
                    const user = await context
                        .getClient({apiVersion: '2023-05-03'})
                        .fetch(`*[_type == "user" && _id == $id][0]{ role }`, {id: value._ref})

                    if (!user) return 'User not found'
                    if (!['admin', 'teacher'].includes(user.role)) {
                        return 'Only users with admin or teacher roles can be assigned as teachers'
                    }

                    return true
                }),
            description: 'Teacher of the class',
        }),
        defineField({
            name: 'chapter',
            title: 'Chapter',
            // type array of references
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'chapterCourse',
                    title: 'Chapter on Course',
                    fields: [
                        {
                            name: 'chapter',
                            title: 'Chapter',
                            type: 'reference',
                            to: [{type: 'chapter'}],
                        },
                        {
                            name: 'active',
                            title: 'Active',
                            type: 'boolean',
                            initialValue: false,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'chapter.name',
                            active: 'active',
                        },
                        prepare(selection) {
                            const {title, active} = selection
                            return {
                                title: title,
                                subtitle: active ? '🟢 Active' : '🔴 Not Active',
                            }
                        },
                    },
                },
            ],

            description: 'PIlih atau buat bab pada course ini',

            options: {
                layout: 'tags',
                sortable: true,
            },
        }),
        defineField({
            name: 'color',
            title: 'Color',
            // type color spinner
            type: 'color',
            description: 'Choose a color for the course',
            // auto generate color based on the name
            options: {
                disableAlpha: false,
            },
            validation: (Rule) => Rule.required(),
            initialValue: {
                hex: '#00786f',
            },
        }),
    ],
})
