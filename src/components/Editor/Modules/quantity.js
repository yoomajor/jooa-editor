export default {
  id: 'quantity',
  name: 'quantity',
  type: 'function',
  moduleName: '수량',
  isFunction: true,
  dataSet: {
    mods: 'quantity',
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
      optionValue: '',
      min: {
        name: 'minimum',
        vol: 1
      },
      max: {
        name: 'maximum',
        vol: 5
      },
      price: {
        isPrice: false,
        value: '10,000',
        view: ''
      }
    }
  },
  link: null
}
