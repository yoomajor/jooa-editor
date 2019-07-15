export default {
  id: 'radio',
  name: 'radio',
  type: 'function',
  moduleName: 'radio',
  isFunction: true,
  dataSet: {
    mods: 'radio',
    column: [
      {
        type: 'text',
        hasLang: true,
        value: {}
      }
    ]
  },
  setting: {
    function: {
      label: 'options',
      hasLang: true,
      optionValue: '',
      item: [
        {
          label: {},
          itemValue: '',
          itemPrice: 0
        },
        {
          label: {},
          itemValue: '',
          itemPrice: 0
        }
      ]
    }
  },
  link: null
}
