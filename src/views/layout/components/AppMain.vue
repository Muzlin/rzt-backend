<template>
  <section class="app-main">
    <transition name="el-zoom-in-center" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <!-- 三级路由缓存不了，暂时缓存所有的组件 -->
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    }
  }

</script>

<style scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
  }

</style>
