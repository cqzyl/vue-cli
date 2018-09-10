<template>
  <section class="num-input tac cf">
    <div class="fl delect"><input class="full_size bgnone" type="button"
      @click="del" value=""
      /></div><div class="fl number"
    ><input class="full_size tac pd-lr-s2 bgnone"
      :max="max"
      :min="min"
      :value="value" @input="valChange($event.target.value)" type="number"
    /></div><div class="fl add"
    ><input class="full_size bgnone" type="button"
      @click="add" value=""
    /></div>
  </section>
</template>

<style lang="scss" scoped>
  .num-input {
    .delect, .add, .number {
      height: 1em;
      border: 1px solid $materialColor;
    }
    .delect, .add {
      width: 1em;
      input {
        background-position: 0 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .delect input {
      background-image: url('data:image/svg+xml;charset=utf-8,<svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><polyline points="11,20 32,20" style="fill:none;stroke:#000;stroke-width:2"/></svg>');
    }
    .add input {
      background-image: url('data:image/svg+xml;charset=utf-8,<svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><polyline points="21,9 21,31 21,20 11,20 32,20" style="fill:none;stroke:#000;stroke-width:2"/></svg>');
    }
    .add, .number {
      margin-left: 3%;
    }
    .number {
      width: calc(94% - 2em);
      input {
        font-size: 0.6em;
      }
    }
  }
</style>

<script>
export default {
  name: 'numInput',
  props: {
    // 步长
    step: {
      type: Number,
      default: 1,
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity,
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity,
    },
    // 输入框默认值
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    add() {
      const newVal = parseInt(this.value, 10) + this.step;
      this.valChange(newVal > this.max ? this.max : newVal);
    },
    del() {
      const newVal = parseInt(this.value, 10) - this.step;
      this.valChange(newVal < this.min ? this.min : newVal);
    },
    valChange(val) {
      this.$emit('input', parseInt(val, 10));
    },
  },
};
</script>
