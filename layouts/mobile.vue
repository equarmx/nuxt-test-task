<template>
  <main class="container">
    <Nuxt></Nuxt>
  </main>
</template>

<script>
export default {
  name: "mobile.vue"
}
</script>

<style scoped lang="scss">
html, body {
  margin: 0;
  padding: 0;
  background: #faf9f7;
  font-size: 10px;
  font-family: 'Source Sans Pro', sans-serif;
}

.container {
  margin: 5px auto 0 auto;
  padding: 0;
}
</style>
