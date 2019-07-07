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
        hasLang: true,
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
      typeValue: 'link',
      style: [
        {
          key: 'color',
          label: 'text color',
          value: 'rgba(255,255,255,1)',
          option: 'color'
        },
        {
          key: 'backgroundColor',
          label: 'background color',
          value: 'rgba(77,86,109,1)',
          option: 'color'
        },
        {
          key: 'borderColor',
          label: 'border color',
          value: 'rgba(77,86,109,1)',
          option: 'color'
        }
      ]
    }
  },
  link: null
}
