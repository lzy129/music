<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/">热门音乐</van-tabbar-item>
    <van-tabbar-item to="/newmusic">热门歌单</van-tabbar-item>
    <van-tabbar-item to="/mvmusic">歌曲mv</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "mvmusic",
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
