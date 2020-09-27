<template>
  <div class="login">
    <p class="title is-3 is-spaced">新規登録</p>
    <p class="subtitle is-5">お名前とメールアドレスを入力してください。</p>
    <div class="field">
      <label class="label">名前</label>
      <div class="control">
        <input class="input" type="text" placeholder="chikako hiraoka">
      </div>
    </div>

    <div class="field">
      <label class="label">メールアドレス</label>
      <div class="control">
        <input class="input" type="email" placeholder="xxx@gmail.com">
      </div>
      <p v-if="isActive" class="help is-danger">正しいメールアドレスの形式ではありません</p>
    </div>
    <div class="field">
      <p class="control">
        <button
          @click="login"
          class="button is-success"
        >送信</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      isActive: false
    }
  },
  methods: {
    login() {
      console.log('バリデーション入れるよ')
      this.isActive = !this.isActive;
      console.log('ログインするよー')
    }
  }
}
</script>

<style lang="scss">
.login {
  width: unquote('min(90%,480px)');
  margin: 20% auto;

  .control {
    button {
      position: absolute;
      right: 0;
    }
  }
}
</style>
