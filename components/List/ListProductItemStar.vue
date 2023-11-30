<template>
  <span>
    <font-awesome-icon v-if="reg" :icon="['far', 'star']" style="color: #d9b202;" />
    <font-awesome-icon v-else :icon="['fas', 'star']" style="color: #face00;" />
  </span>
</template>

<script>
export default {
  props: {
    reg: {
      type: Boolean
    }
  }
}
</script>

<style>
</style>
