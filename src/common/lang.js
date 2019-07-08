const LANG = {
  default: 'en',
  // defaultText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non diam facilisis, consectetur nulla nec, semper diam.',
  defaultText: 'text here',
  defaultLabel: 'Information to be input',
  defaultButton: 'BUTTON',
  langs: [
    { c: 'en', n: 'English', u: true },
    { c: 'ko', n: 'Korean', u: true },
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
    let result = {}
    this.langs.map(x => {
      result[x.c] = ''
    })
    return result
  }
}

export default LANG
