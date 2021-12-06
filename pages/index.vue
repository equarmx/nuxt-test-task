<template>
  <component :is="component"/>
</template>

<script>
export default {
  layout: ctx => ctx.$device.isMobile ? 'mobile' : 'default',
  components: {
    'Desktop': () => import('./desktop.vue'),
    'Mobile': () => import('./mobile.vue'),
  },
  data() {
    return {
      component: ''
    }
  },
  created() {
    this.component = this.$device.isMobile ? 'Mobile' : 'Desktop'
  },
  mounted() {
    this.$store.dispatch('callSetToTheStorage')
  }
}
</script>

<style scoped lang="scss">

</style>
