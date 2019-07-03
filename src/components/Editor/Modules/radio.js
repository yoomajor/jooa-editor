export default {
  name: 'radio',
  type: 'function',
  moduleName: 'radio',
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
      value: '',
      item: [
        {
          label: 'list option item'
        }
      ]
    }
  },
  link: null
}
