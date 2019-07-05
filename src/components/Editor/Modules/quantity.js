export default {
  name: 'quantity',
  type: 'function',
  moduleName: '수량',
  isFunction: true,
  dataSet: {
    mods: 'quantity',
    column: [
      {
        type: 'text',
        value: {}
      }
    ]
  },
  setting: {
    function: {
      optionValue: '',
      min: {
        name: 'minimum',
        vol: 1
      },
      max: {
        name: 'maximum',
        vol: 5
      }
    }
  },
  link: null
}
