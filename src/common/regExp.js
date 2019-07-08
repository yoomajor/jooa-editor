export default {
  name: 'regExp',
  htmlCommentSingle: /<!--(.*?)-->/gm,
  naturalNumber: /^[1-9]\d*$/,
  expEmail: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  expPhone: /^\d{2,3}-\d{3,4}-\d{4}$/,
  numberOnly: function (num) {
    return num.toString().replace(/[^0-9]/g, '')
  },
  comma: function (num) {
    const reg = /^([-+]?\d+)(\d{3})(\.\d+)?/
    let string = '' + (num != null ? num : '')
    string = string.replace(/[^-+.\d]/g, '')
    while (reg.test(string)) string = string.replace(reg, '$1' + ',' + '$2' + '$3')
    return string
  }
}
