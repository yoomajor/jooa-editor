export default {
  name: 'regExp',
  htmlCommentSingle: /<!--(.*?)-->/gm,
  naturalNumber: /^[1-9]\d*$/,
  expEmail: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  expPhone: /^\d{2,3}-\d{3,4}-\d{4}$/,
  numberOnly: function (num) {
    return num.replace(/[^0-9]/g, '')
  }
}
