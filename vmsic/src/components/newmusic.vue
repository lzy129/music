<template>
  <div>
    <van-nav-bar title="热门歌单" fixed style="background-color:red;" />
    <van-loading
      type="spinner"
      color="#1989fa"
      v-show="!show"
      style="line-height:100vh;text-align: center"
    >加载中...</van-loading>
    <div style="height:83vh;overflow:hidden;margin-top: 8vh;" ref="wrapper" v-show="true">
      <div>
        <div
          v-for="(item,index) in list"
          :key="index"
          @click="drop(item.singid+'-'+item.stitle)"
          class="all"
        >
          <div class="left">
            <img :src="item.imgurl" alt="图片损坏" v-lazy="item.imgurl" />
          </div>
          <div class="right">
            <span>歌单类别:{{item.stitle}}</span>
          </div>
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
  name: "newmusic",
  data() {
    return {
      list: [],
      show: false
    };
  },
  created() {
    //https://v1.itooi.cn/netease/songList/hot 获取歌单信息
    //https://v1.itooi.cn/netease/songList?id= 请求歌单歌曲
    var arr = [];
    this.axios
      .get("https://v1.itooi.cn/netease/songList/hot")
      .then(response => {
        var data = response.data.data;
        for (const index in data) {
          var obj = {
            singid: data[index].id,
            stitle:
              data[index].tags[0] +
              "," +
              data[index].tags[1] +
              "," +
              data[index].tags[2],
            imgurl: data[index].coverImgUrl
          };
          this.list.push(obj);
        }
        this.show = true;
      });
  },
  methods: {
    drop(id) {
      this.$router.push({
        path: "./playmic?id=" + id
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

<style lang="scss" scoped>
</style>
