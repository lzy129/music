<template>
  <div>
    <van-nav-bar title="热门mv" style="background-color:red;" fixed />
    <van-loading
      type="spinner"
      color="#1989fa"
      v-show="!show"
      style="line-height:100vh;text-align: center"
    >加载中...</van-loading>
    <div style="height:83.5vh;overflow: hidden;margin-top: 8vh;" ref="wrapper" v-show="true">
      <div class="box">
        <div v-for="(item,index) in list" :key="index" @click="play(item.id)">
          <img :src="item.imgurl" alt="图片损坏" v-lazy="item.imgurl" />
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../template/tabbar";
import BScroll from "better-scroll";
export default {
  name: "mvmusic",
  data() {
    return {
      list: [],
      show: false
    };
  },
  created() {
    this.axios.get("https://v1.itooi.cn/netease/mv/top").then(req => {
      var data = req.data.data;
      data.forEach(item => {
        var obj = {
          id: item.id,
          title: item.artistName,
          imgurl: item.cover
        };
        this.list.push(obj);
      });
      this.show = true;
    });
  },
  methods: {
    play(e) {
      this.$router.push({
        path: "./playmv?id=" + e
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
    });
  },
  components: {
    tabbar: tabbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 50vw;
  }
  img {
    width: 50vw;
  }
  span {
    font-size: 4vw;
  }
}
</style>
