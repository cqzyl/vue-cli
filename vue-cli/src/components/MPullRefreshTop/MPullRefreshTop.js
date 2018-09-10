/**
 * Created by Administrator on 2018/2/27.
 */

export default {
  names: 'MPullRefreshTop',
  props: {
    startLoad:{
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    getNextPage: {
      type: Function,
      default() {
        return function() {
          console.log('getNextPage')
        };
      },
    },
  },
  data() {
    return {
      scrollBody: 0,
      sensitivity: document.body.offsetHeight //灵敏度px
    }
  },
  computed: {
    // 滚动体
    scrollBody() {
      return this.$refs.PullRefreshBody;
    },
  },
  methods: {
    _start() {

      // 第一次加载的滚动判断
      this._firstLoading();

      // 滚动监听
      let scrollTimeFunction = null;
      const _this = this;

      this.scrollBody.onscroll = function(){
        clearTimeout(scrollTimeFunction);
        // 滚动之后100ms执行方法
        scrollTimeFunction = setTimeout(function(){
          _this._scroll();
        },100);
      };
    },
    async _firstLoading() {
      if (!this._canScroll() && this.hasMore){
        // 不能滚动而且还有下一页 则加载下一页
        await this.getNextPage();
        this._firstLoading();
      }
    },
    _canScroll() {
      return this.scrollBody.scrollHeight > this.scrollBody.clientHeight
    },
    _scroll() {
      if(this.isLoading || !this.hasMore) return false;
      //事件监听方法
      const scrollTop = this.scrollBody.scrollTop || 0;
      const maxTop = this.scrollBody.scrollHeight - this.scrollBody.offsetHeight - this.sensitivity;//距离页面底部(px)开始触发
      if (scrollTop >= maxTop) {
        this.getNextPage();
      }
    },
  },
  mounted() {
    if (this.startLoad) {
      this._start();
    } else {
      const una = this.$watch('startLoad', function (newVal, oldVal) {
        // 做点什么
        if (newVal) {
          this._start();
          una();
        }
      });
    }
  },
};
