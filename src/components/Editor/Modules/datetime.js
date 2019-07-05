export default {
  name: 'datetime',
  type: 'function',
  moduleName: 'date time',
  isFunction: true,
  dataSet: {
    mods: 'datetime',
    column: [
      {
        type: 'text',
        value: {}
      }
    ]
  },
  setting: {
    function: {
      label: 'datetime',
      date: new Date().toISOString()
    }
  },
  link: null
}
