<template>
  <dialog v-show="show">
    <div class="dialog-main bgfff col-10 tac pd-tb-s5 pd-lr-s3 lineht-s1r8">
      <input @click="toHide" type="button" class="pa close-r close-rt">
      <h4 class="font-s3r6">{{ view.h }}</h4>
      <div class="icon30 mg-lr-c pd-s4"><img class="full_size" :src="view.src | oss"></div>
      <div class="font-s3r5">
        <p v-for="(t, index) in view.p" :key="index">{{ t }}</p>
      </div>
      <div class="col-7 mg-lr-c pd-t-s3">
        <input @click="done" class="btn-3" type="button" :value="view.btn">
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  name: 'alertResult',
  data() {
    return {
      show: false,
      texts: [
        // 夺宝失败，无人成功
        {
          h: '夺宝失败',
          src: '/cqactivity/snatch/common/icon/alert/none.png',
          p: [
            '矮油！',
            '宝贝未被成功带走，看来是老铁们的热情不够。',
            '积分已原路返还，敬请期待下期夺宝商品！',
          ],
          btn: '确 定',
        },
        // 夺宝失败，有人成功
        {
          h: '夺宝失败',
          src: '/cqactivity/snatch/common/icon/alert/others.png',
          p: [
            '喜大普奔，本期夺宝商品已被幸运的“', // 小叮当
            '”带走！没抽中的小伙伴可不要灰心，也许小香下一个宠幸的就是你，我们下期再见！'
          ],
          btn: '确 定',
        },
        // 夺宝成功未领取
        {
          h: '夺宝成功',
          p: [
            '恭喜您获得', // 埃及进口长绒棉毛巾
            '认筹券码：', // 34578991ad1523
            '券码请以实际保存为准',
          ],
          btn: '前往兑换',
        },
        // 夺宝成功已领取
        {
          h: '夺宝成功',
          p: [
            '恭喜您获得', // 埃及进口长绒棉毛巾
            '认筹券码：', // 34578991ad1523
            '券码请以实际保存为准',
          ],
          btn: '已 兑 换',
        },
      ],
      status: -1,
      // 用户夺宝参与id
      id: '',
      view: {
        h: '',
        src: '',
        p: [],
        btn: '',
      },
      options: {
        good: {},
        item: [],
      },
    };
  },
  methods: {
    async toShow({ item, good }) {
      await this.$store.dispatch('user/getData');
      this.options = { item, good };

      // 夺宝失败，无人成功
      if (!item || !item.length) {
        this.status = 0;
        this.view = this.texts[0];
      } else {
        this.views();
      }

      this.show = true;
    },
    done() {
      // 如果夺宝成功未领取
      if (this.status === 2) {
        this.$emit('getGood', {
          name: this.options.good.goods.name,
          snatch_code: this.options.item[0].snatch_code,
          snatch_participants_id: this.options.item[0].id,
        });
      }
      this.toHide();
    },
    toHide() {
      this.show = false;
    },
    views() {
      const { item: [item], good: { goods } } = this.options;

      if (item.openid !== this.user.openid) {
        // 夺宝失败，有人成功
        this.status = 1;
        const texts = this.texts[1];
        this.view = {
          h: texts.h,
          src: texts.src,
          p: [texts.p.join(item.user.nickname)],
          btn: texts.btn,
        };
      } else if (item.is_get.toString() === '1') {
        // 夺宝成功，未领取
        this.status = 2;
        const texts = this.texts[2];
        this.view = {
          h: texts.h,
          src: goods.banner[0],
          p: [
            texts.p[0] + goods.name,
            texts.p[1] + item.snatch_code,
            texts.p[2]
          ],
          btn: texts.btn,
        };
      } else {
        // 夺宝成功，已领取
        this.status = 3;
        const texts = this.texts[3];
        this.view = {
          h: texts.h,
          src: goods.banner[0],
          p: [
            texts.p[0] + goods.name,
            texts.p[1] + item.snatch_code,
            texts.p[2]
          ],
          btn: texts.btn,
        };
      }
    },
  },
  mounted() {
    this.$on('toShow', this.toShow);
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
  },
};
</script>
