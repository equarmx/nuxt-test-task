<template>
  <div class="error-page">
    <h1 style="color: red;">ERROR 404</h1>
    <p>{{error}}</p>
    <nuxt-link to="/">Вернуться на главную</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "error.vue",
  props: ['error']
}
</script>

<style scoped lang="scss">
.error-page {
  max-width: 1200px;
  font-size: 1.6rem;
  padding-top: 5rem;
  margin: 0 auto;
}
</style>
