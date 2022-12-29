export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.isRequired(),
    },
    {
      name: 'imgUrl',
      title: 'Image',
      type: 'image',
    },
  ],
}
