<template>
  <ul class="pd-t-s1" v-if="data && data.length">
    <li
      class="pd-lr-s2"
      v-for="(item, index) in data"
      :key="index"><list-a-item :data="item" @toSubmit="toSubmit"/></li>
  </ul>
</template>

<script>
import listAItem from './listAItem';

export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toSubmit(...data) {
      this.$emit('toSubmit', ...data);
    },
  },
  components: { listAItem },
};
</script>

<style scoped>
  li:nth-child(n+2) {
    margin-top: 2vw;
  }
</style>
