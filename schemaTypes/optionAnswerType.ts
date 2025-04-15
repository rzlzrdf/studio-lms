import {defineField, defineType} from 'sanity'

export const optionAnswerType = defineType({
    name: 'optionAnswerType',
    title: 'Opsi Pilgan',
    type: 'object',
    preview: {
        select: {
            title: 'label',
            isCorrect: 'isCorrect',
        },
        prepare({title, isCorrect}) {
            return {
              title: title || 'No name',
              subtitle: isCorrect ? 'Correct Answer' : 'False Answer',
            }
          },
    },
    options: {
        collapsible: true,
        collapsed: false,
    },
    fields: [
        defineField({
            name: 'label',
            title: 'Pilihan Ganda',
            type: 'string',
            description: 'Label opsi pilihan ganda',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isCorrect',
            title: 'Is Correct',
            type: 'boolean',
            description: 'Indicates if this option is the correct answer',
            initialValue: false,
        }),
    ],
})
