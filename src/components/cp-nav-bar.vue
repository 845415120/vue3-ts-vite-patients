<script setup lang="ts">
// 封装需求❓：支持 title rightText 属性，支持 click-right 事件，click-left函数内支持返回上一页或默认首页
const onClickLeft = () => {
  //
};
const onClickRight = () => {
  //
};
</script>

<template>
  <van-nav-bar
    left-arrow
    @click-left="onClickLeft"
    fixed
    title="注册"
    right-text="注册"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
