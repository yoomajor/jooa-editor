<template>
  <div class="container">
    <Lang class="innerBox" />
    <Currency class="innerBox" />
  </div>
</template>

<script>
import Lang from '@/components/Setting/Lang.vue'
import Currency from '@/components/Setting/Currency.vue'

export default {
  name: 'Setting',
  components: {
    Lang,
    Currency
  }
}
</script>
