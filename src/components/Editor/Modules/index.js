const files = require.context('.', false, /\.js$/)
const moduleList = {}
const settings = {
  style: {
    inActivate: [],
    color: 'rgba(62,62,62,1)',
    backgroundColor: 'rgba(255,255,255,1)',
    backgroundImage: ''
  },
  function: {}
}

// index.js를 제외한 모든 js를 file명을 키로 modules에 담아 리턴
files.keys().forEach((key) => {
  if (key === './index.js') return
  moduleList[key.toLowerCase().replace(/(\.\/|\.js)/g, '')] = files(key).default
})

for (let index in moduleList) {
  moduleList[index].setting = _.merge(moduleList[index].setting, settings)
  if (moduleList[index].type === 'function') {
    moduleList[index].setting.function = _.merge(moduleList[index].setting.function, { isRequired: true })
  }
}

export default moduleList
