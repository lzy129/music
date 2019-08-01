<template>
  <div>
    <van-nav-bar :title="title" @click-left="onClickLeft" left-arrow style="background-color:red;" />
    <van-loading
      type="spinner"
      color="#1989fa"
      v-show="!show"
      style="line-height:100vh;text-align: center"
    >加载中...</van-loading>
    <div v-show="show" style="height:91vh;overflow:hidden;margin-top: 1vh;" ref="wrapper">
      <div>
        <div v-for="(item,index) in list" :key="index" class="all" @click="play(index)" ref="name">
          <div class="left">
            <img :src="item.imgurl" alt="资源错误" v-lazy="item.imgurl" />
          </div>
          <div class="right">
            <div class="rig-text">
              <p>{{item.singer}}</p>
              <p>{{item.songname}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <audio :src="played" autoplay="flag" @error="err"></audio>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "playmic",
  data() {
    return {
      title: "",
      list: [],
      played: null,
      flag: false,
      time: null,
      show: false,
      num: null
    };
  },
  created() {
    var id = this.$route.query.id.split("-")[0];
    this.title = this.$route.query.id.split("-")[1];
    var arr = [];
    this.axios
      .get("https://v1.itooi.cn/netease/songList?id=" + id)
      .then(response => {
        var data = response.data.data.tracks;
        for (const index in data) {
          if (data[index].lMusic) {
            var time = Number(
              data[index].lMusic.playTime.toString().substring(0, 3)
            );
            var obj = {
              singid: data[index].id,
              singer: data[index].artists[0].name,
              songname: data[index].name,
              imgurl: data[index].album.picUrl,
              playtime: time
            };
            this.list.push(obj);
          }
        }
        this.show = true;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    play(e) {
      clearInterval(this.time);
      this.num = e;
      for (const index in this.list) {
        this.$refs.name[index].style.color = "";
        if (index == e) {
          this.$refs.name[e].style.color = "red";
          this.played =
            "https://v1.itooi.cn/netease/url?id=" +
            this.list[e].singid +
            "&quality=flac";
          this.time = setInterval(() => {
            this.list[index].playtime = this.list[index].playtime - 1;
            if (this.list[index].playtime < 0) {
              this.flag = false;
              clearInterval(this.time);
              this.nextplay();
              this.$refs.name[e].style.color = "";
            }
          }, 1000);
        }
      }
    },
    err(e) {
      this.$toast({
        message: "获取歌曲信息失败",
        duration: 2000
      });
      setTimeout(() => {
        for (const index in this.list) {
          this.$refs.name[index].style.color = "";
        }
        this.nextplay();
      }, 2000);
    },
    nextplay() {
      clearInterval(this.time);
      if (this.num > this.list.length - 2) {
        this.$refs.name[0].style.color = "red";
        this.num = 0;
        this.played =
          "https://v1.itooi.cn/netease/url?id=" +
          this.list[this.num].singid +
          "&quality=flac";
        this.time = setInterval(() => {
          this.list[this.num].playtime = this.list[this.num].playtime - 1;
          if (this.list[this.num].playtime < 0) {
            this.flag = false;
            clearInterval(this.time);
            this.$refs.name[this.num].style.color = "";
            this.nextplay();
          }
        }, 1000);
      } else {
        this.num = Number(this.num) + 1;
        this.$refs.name[this.num].style.color = "red";
        this.played =
          "https://v1.itooi.cn/netease/url?id=" +
          this.list[this.num].singid +
          "&quality=flac";
        this.time = setInterval(() => {
          this.list[this.num].playtime = this.list[this.num].playtime - 1;
          if (this.list[this.num].playtime < 0) {
            this.flag = false;
            clearInterval(this.time);
            this.$refs.name[this.num].style.color = "";
            this.nextplay();
          }
        }, 1000);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
    });
    var audio = document.querySelector("audio");
    this.$store.commit("VisibilityChange", audio);
  }
};
</script>
<style lang="scss" scoped>
</style>

