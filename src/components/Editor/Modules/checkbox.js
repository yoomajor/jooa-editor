export default {
  name: 'checkbox',
  type: 'function',
  moduleName: 'checkbox',
  isFunction: true,
  dataSet: {
    mods: 'checkbox',
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
      optionValue: [],
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
