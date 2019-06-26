const LANG = {
  default: 'ko',
  langs: [
    { c: 'ko', n: 'Korean', u: true },
    { c: 'en', n: 'English', u: true },
    { c: 'zh', n: 'Chinese', u: false },
    { c: 'fr', n: 'French', u: false }
  ],
  init: function () {
    let initInfo = this.langs.filter(x => {
      return x.u
    })
    return initInfo
  },
  langObj: function () {
    // let result = {}
    let result = {}
    this.langs.map(x => {
      result[x.c] = ''
    })
    return result
  }
}

export default LANG
