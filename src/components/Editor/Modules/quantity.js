export default {
  name: 'quantity',
  type: 'function',
  moduleName: '수량',
  isFunction: true,
  dataSet: {
    mods: 'quantity',
    column: [
      {
        type: 'text',
        value: {}
      }
    ]
  },
  setting: {
    function: {
      optionValue: '',
      min: {
        name: 'minimum',
        vol: 1
      },
      max: {
        name: 'maximum',
        vol: 5
      },
      action: function quantity () {
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
  },
  link: null
}
