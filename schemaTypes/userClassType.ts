import {defineField, defineType} from 'sanity'

export const userClassType = defineType({
    name: 'userCourse',
    title: 'User <=> Course',
    type: 'document',
    preview: {
        select: {
          title: 'userId.name',
        },
        prepare({title}) {
          return {
            title: title || 'No name' + ' - Course Relation',
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
            name: "courseId",
            title: "Course ID",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{type: "course"}],
                },
            ],
            validation: (Rule) => Rule.required(),
            description: "Course ID for this chapter",
        }),
      ]
})
