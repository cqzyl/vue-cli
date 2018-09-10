<template>
  <section>
    <div
      v-show="loading"
      class="tac pd-s2">
      <img class="col-1" :src="img.loading" alt="">
    </div>
    <div
      v-show="noMore"
      class="font-s3r0 lineht-s2r0 pd-s3 tac">
      别扯了，到底了~
    </div>
  </section>
</template>

<style>

</style>

<script>
import ballTriangle from '@/assets/img/ball-triangle.svg';

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      img: {
        loading: ballTriangle,
      },
    };
  },
};
</script>
