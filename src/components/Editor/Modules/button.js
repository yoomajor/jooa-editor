export default {
  name: 'button',
  type: 'standard',
  moduleName: '1단 버튼',
  isFunction: true,
  unCommon: true,
  dataSet: {
    mods: 'button',
    column: [
      {
        type: 'button',
        value: {}
      }
    ]
  },
  setting: {
    function: {
      type: [
        {
          name: 'link url',
          action: 'link'
        },
        {
          name: 'submit',
          action: 'submit'
        }
      ],
      url: '',
      typeValue: 'link'
    }
  },
  link: null
}
