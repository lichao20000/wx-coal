<template>
  <transition name='fade'>
    <div v-show='visible' class='lt-pop-toast'>
      <div class="msg" v-html="message"></div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: true,
      message: ''
    }
  }
}
</script>
<style lang="postcss" scoped>
.lt-pop-toast {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  word-wrap: break-word;
  text-align: center;
  z-index: 9999;
  color: #fff;
  overflow: hidden;
  .msg {
    max-width: 60%;
    min-width: 30%;
    padding: 20px;
    font-size: .3rem;
    line-height: 40px;
    border-radius: 5px;
    background: rgba(0,0,0,0.7);
  }
}
</style>
