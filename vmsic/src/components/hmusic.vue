<template>
  <div>
    <van-nav-bar title="热门音乐" fixed style="background-color:red;" />
    <van-loading
      type="spinner"
      color="#1989fa"
      v-show="!show"
      style="line-height:100vh;text-align: center"
    >加载中...</van-loading>
    <div v-show="show" style="height:83vh;overflow:hidden;margin-top: 8vh;" ref="wrapper">
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
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../template/tabbar";
import BScroll from "better-scroll";
export default {
  name: "hmusic",
  data() {
    return {
      list: [],
      played: null,
      flag: false,
      time: null,
      show: false,
      num: null
    };
  },
  created() {
    var arr = [];
    this.axios
      .get("https://v1.itooi.cn/netease/songList?id=141998290")
      .then(response => {
        var data = response.data.data.tracks;
        for (const index in data) {
          if (index >= 22) {
            break;
          } else {
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
        }
        this.show = true;
      });
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
      this.scroll.on("scrollEnd", pos => {
        if (this.scroll.maxScrollY == this.scroll.y) {
          this.axios
            .get("https://v1.itooi.cn/netease/songList?id=141998290")
            .then(response => {
              var data = response.data.data.tracks;
              var array = [];
              for (const index in data) {
                if (index > this.list.length && index < this.list.length + 8) {
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
                    array.push(obj);
                  }
                }
              }
              this.list.push(...array);
            });
        }
      });
    });
  },
  methods: {
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
  components: {
    tabbar: tabbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>