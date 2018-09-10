<template>
  <!-- scroll body -->
  <div class="m-pull-refresh-scroll-body" ref="PullRefreshBody">
    <!-- 内容列表 -->
    <slot></slot>
    <!-- 加载中 -->
    <div v-show="hasMore" :class="{ 'hide-loading': !isLoading }" class="theendli">
      <div class="ball-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <!-- 没有更多 -->
    <div class="theendli" v-show="!hasMore"><h3>- - - - - - &nbsp;&nbsp;&nbsp;没有更多数据&nbsp;&nbsp;&nbsp; - - - - - -</h3></div>
  </div>
</template>

<script>
  export default require('./MPullRefreshTop.js')
</script>

<style lang="scss" scoped>
  @import "./MPullRefreshTop.scss";
</style>
