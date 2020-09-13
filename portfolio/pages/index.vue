<template>
  <div class="container">
    <Top />
  </div>
</template>

<script>
import Top from '@/components/Top';
import Vue from 'vue';
import VueTypedJs from 'vue-typed-js';
Vue.use(VueTypedJs);

export default {
  components: {
    Top,
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #000;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMqL7ty4ADMIIkF7SqbsYmP+gkAbAbGgsk/ddhAAAAAElFTkSuQmCC);
}
</style>
