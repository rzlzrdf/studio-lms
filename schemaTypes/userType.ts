import {defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the user',
    }),
    defineField({
      name: 'nisn',
      title: 'NISN or NIP',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'NISN of the student or NIP for Teacher',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      description: 'Email of the user',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Password of the user',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Student', value: 'student'},
          {title: 'Teacher', value: 'teacher'},
          {title: 'Admin', value: 'admin'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Role of the user',
    }),
  ],
})
