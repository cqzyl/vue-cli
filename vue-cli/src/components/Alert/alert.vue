<template>
  <dialog v-show="show">
    <div class="dialog-main bgfff pd-s3 col-9 lineht-s2">
      <h1 v-show="title" class="font-s4r2 clrmain tac fw6 pd-s1 pd-b-s3">{{ title }}</h1>
      <p v-show="text" class="font-s3r8 tindent-s2 pd-s1 pd-b-s3">{{ text }}</p>
      <div class="tac pd-b-s1">
        <input class="btn-2" type="button" @click="$emit('tohide')" value="确 定">
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  name: 'bxAlert',
  data() {
    return {
      show: true,
      title: '',
      text: '',
    };
  },
};
</script>

<style>

</style>
