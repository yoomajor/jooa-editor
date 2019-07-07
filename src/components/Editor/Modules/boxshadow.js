export default {
  name: 'boxshadow',
  type: 'standard',
  moduleName: '그림자',
  isFunction: false,
  dataSet: {
    mods: 'boxshadow',
    column: [
      {
        type: 'boxshadow',
        hasLang: false,
        value: {}
      }
    ]
  },
  setting: {
    unitStyle: [
      {
        key: 'borderColor',
        label: 'boxshadow color',
        value: 'rgba(62,62,62,1)',
        option: 'unitColor'
      },
      {
        key: 'borderStyle',
        label: 'boxshadow style',
        value: 'solid',
        option: 'style'
      },
      {
        key: 'borderWidth',
        label: 'boxshadow width',
        value: '1px',
        option: 'width'
      }
    ]
  },
  link: null
}
