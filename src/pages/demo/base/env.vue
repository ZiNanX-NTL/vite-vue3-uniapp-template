<route lang="jsonc" type="page">
{
  "style": { "navigationBarTitleText": "环境获取" }
}
</route>

<template>
  <view class="">当前环境 isDev：{{ isDev }} (通过 import.meta.env.DEV 获取)</view>
</template>

<script lang="ts" setup>
const isDev = import.meta.env.DEV;
</script>

<style lang="scss" scoped>
//
</style>
