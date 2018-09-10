<template>
  <div v-show="isShow" class="bxloading">
    <div class="bximg">
      <img src="https://yxclub.oss-cn-hangzhou.aliyuncs.com/bxnew/pphd/loading.png">
      <div class="bximgdiv">
          <img src="https://yxclub.oss-cn-hangzhou.aliyuncs.com/bxnew/pphd/loading.png">
      </div>
    </div>
    <p class="bx-p">欢迎来到本香世界</p>
    <p>loading</p>
  </div>
</template>

<style scoped>
.bxloading {
  width: 100%;
  height: 100%;
  background-color: #d8d8d8;
  font-size: 3vw;
  line-height: 6vw;
  color: #888;
  padding-top: 20vw;
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 2;
}
.bximg {
  width: 20vw;
  height: 43.5vw;
  margin: 0 auto;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.bximg img {
  width: 100%;
  opacity: 0.25;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.bximgdiv {
  width: 100%;
  height: 100%;
  margin-top: -43.5vw;
  padding-bottom: 0vw;
  overflow: hidden;
}
.bximgdiv {
  width: 100%;
  height: 0;
  margin-top: -43.5vw;
  padding-bottom: 0vw;
  overflow: hidden;
  animation: loading 5s infinite ease-in-out 0s;
  -webkit-animation: loading 5s infinite ease-in-out 0s;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}
.bximgdiv img {
  opacity: 0.7;
}
.bx-p {
  letter-spacing: 1em;
}
@-webkit-keyframes loading {
  0% {
    height: 0;
  }
  30% {
    height: 40%;
  }
  80% {
    height: 80%;
  }
  100% {
    height: 100%;
  }
}
@keyframes loading {
  0% {
    height: 0;
  }
  30% {
    height: 40%;
  }
  80% {
    height: 90%;
  }
  100% {
    height: 100%;
  }
}
.bx-imgdiv.loading-paused-animate {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
</style>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>
