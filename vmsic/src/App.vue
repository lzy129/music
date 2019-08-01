<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.van-nav-bar__title {
  color: white;
}

.all {
  border: 1px solid gray;
  box-sizing: border-box;
  width: 96vw;
  height: 11.5vh;
  display: flex;
  margin: 1vh;
  .left {
    width: 21vw;
    margin-right: 1vh;
    img {
      width: 96%;
      height: 96%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4vw;
    .rig-text {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
