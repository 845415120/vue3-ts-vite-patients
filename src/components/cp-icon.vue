<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
// 提供name属性即可
defineProps<{
  name: string
}>()
</script>


<style lang="scss" scoped>
.cp-icon {
  // 说明：em 相对于父元素字体大小
  width: 1em;
  height: 1em;
}
</style>