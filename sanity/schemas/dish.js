export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of the dish',
      validation: (Rule) => Rule.isRequired(),
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'imgUrl',
      title: 'Image',
      type: 'image',
    },
  ],
}
