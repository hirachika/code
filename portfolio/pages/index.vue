<template>
  <div class="top">
    <div class="container">
      <vue-typed-js
        :strings="['Hellow World', 'Chikako Hiraoka', 'Portfolio 2020']"
        :loop="true"
        :loopCount="1"
        @onComplete="doSmth()"
      >
        <h1 :class="{'hidden': isActive}"><span class="typing"></span></h1>
      </vue-typed-js>
      <nuxt-link
        class="login"
        :class="{'visible': isActive}"
        to="/login"
      >
        <button class="button is-primary is-inverted is-outlined">Welcom Login Form</button>
      </nuxt-link>
    </div>
</div>

</template>

<script>
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs);

export default {
  components: {
  },
	data() {
		return{
			isActive: false
		}
	},
	methods: {
		doSmth() {
			this.isActive = !this.isActive;
		}
	}
}
</script>

<style lang="scss">
.top {
  background-color: #000;
}

.container {
  position: relative;
  width: 100%;
  min-height: 100vh;

  h1 {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    color: $purple;
    text-align: center;
    color: #fff;
    font-size: 72px;
  }

  .login {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translateY(-50%) translateX(-50%);
    opacity: 0;
    text-align: center;
  }

  .hidden {
    animation: fadeOut .5s linear .5s forwards;
    display: none;
  }

  .visible {
    display: block;
    animation: fadeIn .5s linear 1s forwards;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>