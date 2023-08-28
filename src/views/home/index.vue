<template>
  <div>
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like"
        ><knowledge-list type="like" />
      </van-tab>
      <van-tab title="推荐" name="recommend"
        ><knowledge-list type="recommend"
      /></van-tab>
      <van-tab title="减脂" name="fatReduction"
        ><knowledge-list type="fatReduction"
      /></van-tab>
      <van-tab title="饮食" name="food"><knowledge-list type="food" /></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import KnowledgeList from "./components/KnowledgeList.vue";
import { ref } from "vue";
import type { KnowledgeType } from "@/types/consult";

const active = ref<KnowledgeType>("recommend");
</script>

<style lang="scss" scoped></style>
