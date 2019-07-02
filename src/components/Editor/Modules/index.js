const files = require.context('.', false, /\.js$/)
const moduleList = {}
const settings = {
  style: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(255,255,255,1)'
  },
  function: {
    isRequired: true
  }
}

// index.js를 제외한 모든 js를 file명을 키로 modules에 담아 리턴
files.keys().forEach((key) => {
  if (key === './index.js') return
  moduleList[key.toLowerCase().replace(/(\.\/|\.js)/g, '')] = files(key).default
})

for(var index in moduleList) { 
  moduleList[index].setting = settings
}

export default moduleList
