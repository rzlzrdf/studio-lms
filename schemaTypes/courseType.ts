import {defineField, defineType} from 'sanity'

export const coursesType = defineType({
  name: 'course',
  title: 'Course',
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
  ],
})
