<script setup lang="ts"></script>

<template>
  <router-view></router-view>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary">按钮</van-button>
  <a href="#">123</a>
</template>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
