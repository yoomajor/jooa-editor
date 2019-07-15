export default {
  id: 'border',
  name: 'border',
  type: 'standard',
  moduleName: '구분선',
  isFunction: false,
  dataSet: {
    mods: 'border',
    column: [
      {
        type: 'border',
        hasLang: false,
        value: {}
      }
    ]
  },
  setting: {
    exceptUnit: [
      'textColor'
    ],
    unitStyle: {
      borderColor: 'rgba(62,62,62,1)',
      borderStyle: 'solid'
    }
  },
  link: null
}
