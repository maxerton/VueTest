<template>
  <div class="root-wrapper">
    <RootHeader />
    <div class="container" />
    <RootFooter />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style>
  body {
    background-color: #e8f1fe;
  }

  html, body, .root-wrapper {
    min-height: 100vh;
  }

  .root-wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
