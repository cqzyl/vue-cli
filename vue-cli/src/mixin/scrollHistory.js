const scrollHistory = {
  data() {
    return {
      scrollHistory: {
        x: 0,
        y: 0,
      },
    };
  },
  beforeRouteLeave(from, to, next) {
    const x = window.scrollX;
    const y = window.scrollY;
    this.scrollHistory = { x, y };
    next();
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      const { x, y } = vm.scrollHistory;
      setTimeout(() => {
        window.scrollTo(x, y);
      }, 300);
    });
  },
};

export { scrollHistory as default };
