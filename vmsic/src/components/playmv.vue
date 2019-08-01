<template>
  <div>
    <van-nav-bar title="mv播放" @click-left="onClickLeft" left-arrow style="background-color:red;" />
    <div class="box">
      <video :src="url" autoplay controls class="box-video"></video>
    </div>
  </div>
</template>
<script>
export default {
  name: "playmv",
  data() {
    return {
      url: null
    };
  },
  created() {
    const id = this.$route.query.id;
    this.url = "https://v1.itooi.cn/netease/mvUrl?id=" + id + "&quality=1080";
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style  scoped>
.van-nav-bar .van-icon {
  color: white;
}

.box {
  width: 100vw;
  height: 50vw;
  border: 1px solid solid;
}

.box-video {
  width: 100vw;
}
</style>
