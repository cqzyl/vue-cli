<template>
  <div class="progress-a"><mark
    :class="{ 'full-pga': isfull, 'end-pga': isEnd }"
    class="db bgnone"><span
    class="db" :style="{ 'width': percentage }"></span><label
    class="font-s4r8 fr">夺宝进度：{{percentage}}</label></mark></div>
</template>

<script>
export default {
  name: 'progressA',
  props: {
    value: {
      type: Number,
      default: 80,
    },
    max: {
      type: Number,
      default: 100,
    },
    // 是否失效
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isfull() {
      return this.value === this.max;
    },
    percentage() {
      return `${Math.floor((this.value / this.max) * 100)}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
  $height: 4vw;
  .progress-a {
    height: $height;
    mark {
      border: 1px solid #333;
      border-radius: 10vw;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: left top;
      overflow: hidden;
      color: $materialColor;
    }
    span {
      background-color: $mainColor;
      height: 100%;
    }
    label {
      margin-top: 0.25 -$height * 2;
      line-height: $height * 2;
      padding-right: 3%;
    }
    .full-pga {
      span {
        background-color: $rightColor;
      }
      label {
        color: $fontWhiteColor;
      }
    }
    .end-pga {
      span {
        background-color: $failureColor;
      }
      label {
        color: $ordinaryColor;
      }
    }
  }
</style>
