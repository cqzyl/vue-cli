<template>
  <div v-show="isShow" class="bxLoadingOver">
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
</template>

<style scoped lang="scss">
  .bxLoadingOver {
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 150;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .ball-spin-fade-loader {
    $divwidth: 23%;
    $divpsFir: 35%;
    $divpsSco: 25%;
    $divpsX: 38%;
    $divpsY: 38%;
    $loadingcolor: #fff;
    $loadingsize:14vw;

    width: $loadingsize;
    height: $loadingsize;
    flex: 0 0 auto;
    position: relative;

    @keyframes ball-spin-fade-loader {
      50% {
        opacity: 0.3;
        transform: scale(0.4); }

      100% {
        opacity: 1;
        transform: scale(1); } }

    div:nth-child(1) {
      top: $divpsFir + $divpsX;
      left: 0 + $divpsY;
      animation: ball-spin-fade-loader 1s 0s infinite linear; }
    div:nth-child(2) {
      top: $divpsFir + $divpsX  - 4%;
      left: $divpsSco + $divpsY;
      animation: ball-spin-fade-loader 1s 0.12s infinite linear; }
    div:nth-child(3) {
      top: 0 + $divpsX;
      left: $divpsFir + $divpsY;
      animation: ball-spin-fade-loader 1s 0.24s infinite linear; }
    div:nth-child(4) {
      top: -$divpsSco + $divpsX;
      left: $divpsSco + $divpsY;
      animation: ball-spin-fade-loader 1s 0.36s infinite linear; }
    div:nth-child(5) {
      top: -$divpsFir + $divpsX;
      left: 0 + $divpsY;
      animation: ball-spin-fade-loader 1s 0.48s infinite linear; }
    div:nth-child(6) {
      top: -$divpsSco + $divpsX;
      left: -$divpsSco + $divpsY;
      animation: ball-spin-fade-loader 1s 0.6s infinite linear; }
    div:nth-child(7) {
      top: 0 + $divpsX;
      left: -$divpsFir + $divpsY;
      animation: ball-spin-fade-loader 1s 0.72s infinite linear; }
    div:nth-child(8) {
      top: $divpsSco + $divpsX;
      left: -$divpsSco + $divpsY;
      animation: ball-spin-fade-loader 1s 0.84s infinite linear; }
    div {
      background-color: $loadingcolor;
      width: $divwidth;
      height: $divwidth;
      border-radius: 100%;
      animation-fill-mode: both;
      position: absolute;
    }
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
