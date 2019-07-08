const CURRENCY = {
  default: 'KRW',
  currs: [
    { c: 'KRW', n: 'KRW', e: '&#8361;' }, // c : code, n : name, e : entity
    { c: 'USD', n: 'USD', e: '&#36;' },
    { c: 'GBP', n: 'GBP', e: '&#163;' },
    { c: 'EUR', n: 'EUR', e: '&#8364;' }
  ],
  currencyInfo: function (currency) {
    return this.currs.filter(x => x.c === currency)[0]
  }
}

export default CURRENCY
