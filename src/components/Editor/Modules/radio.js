export default {
  name: 'radio',
  type: 'function',
  moduleName: 'radio',
  isFunction: true,
  dataSet: {
    mods: 'radio',
    column: [
      {
        type: 'text',
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
          itemValue: ''
        },
        {
          label: {},
          itemValue: ''
        }
      ]
    }
  },
  link: null
}