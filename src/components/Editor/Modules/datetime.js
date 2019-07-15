export default {
  id: 'datetime',
  name: 'datetime',
  type: 'function',
  moduleName: 'date time',
  isFunction: true,
  dataSet: {
    mods: 'datetime',
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
      label: 'datetime',
      date: new Date().toISOString(),
      isASAP: true,
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
