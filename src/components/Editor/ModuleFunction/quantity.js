export default {
  name: 'quantity',
  action: function () {
    document.addEventListener('click', function (e) {
      if (e.target.closest('.quantity') !== null) {
        let target = e.target
        let q = target.closest('.quantity')
        let vol = q.querySelector('.inputQuantity')
        let min = q.querySelector('[data-min]').dataset.min
        let max = q.querySelector('[data-max]').dataset.max
        if (target.dataset.quantity === 'minus') {
          vol.value <= min ? alert('최소' + min + '개까지 가능합니다.') : vol.value--
        }
        if (target.dataset.quantity === 'plus') {
          vol.value >= max ? alert('최대' + max + '개까지 가능합니다.') : vol.value++
        }
      }
    })
  }
}
