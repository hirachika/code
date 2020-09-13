
<template>
	<div class="top">
		<vue-typed-js
			:strings="['Hellow World', 'Chikako Hiraoka', 'Portfolio 2020']"
			:loop="true"
			:loopCount="3"
		>
			<h1><span class="typing"></span></h1>
		</vue-typed-js>
	</div>
</template>

<script>
import Vue from 'vue';
import VueTypedJs from 'vue-typed-js';
Vue.use(VueTypedJs);

export default {
}
</script>

<style lang="scss">
.top {
	h1 {
		color: $purple;
		margin: 0 auto;
	}
}
</style>