<template>
  <div class="toast">
    <i>{{ message }}</i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Toast',
    };
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  word-wrap: break-word;
  padding: 10px;
  text-align: center;
  z-index: 9999;
  font-size: 4vw;
  max-width: 80%;
  color: #ffffff;
  border-radius: 1.5vw;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  animation: toast 3s linear 0s 1 normal;
  animation-fill-mode: both;
}
i {
  font-style: normal;
}
@keyframes toast {
  0% {transform: translate(-50%, -50%) scale(0);}
  8% {transform: translate(-50%, -50%) scale(1);}
  92% {transform: translate(-50%, -50%) scale(1);}
  100% {transform: translate(-50%, -50%) scale(0);}
}
</style>
