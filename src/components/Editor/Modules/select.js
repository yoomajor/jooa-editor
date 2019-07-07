export default {
  name: 'select',
  type: 'function',
  moduleName: 'select',
  isFunction: true,
  dataSet: {
    mods: 'select',
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
