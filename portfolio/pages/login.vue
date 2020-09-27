<template>
  <div class="login">
    <div class="loginHead">
      <p class="title is-3 is-spaced">ログイン</p>
      <p>＼ログインしたいなら俺を倒してからいけ！／</p>
      <img src="@/assets/img/hoshide-idou-hiyoko.png" alt="">
    </div>
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
        class="button is-fullwidth is-primary"
      >送信</button>
      </p>
    </div>
    <div class="other">
      <p>または</p>
      <div class="snsLogin">
        <button
          @click="googleLogin"
          class="button is-fullwidth google"
        >Googleでログイン</button>
        <button class="button is-fullwidth facebook">Facebookでログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';

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
      console.log('ログインしちゃんだからね！')
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        // TODO:トップページへ
      }).catch((error) => {
        console.log('ログインできませんでしたよ諦めて')
        // TODO:ログイン画面にリダイレクトさせる
      });
    }
  }
}
</script>

<style lang="scss">
.login {
  width: unquote('min(90%,480px)');
  margin: 20% auto;

  .loginHead {
    text-align: center;
    p {
      margin-bottom: 10px;
      color: #363636;
      font-weight: bold;
    }

    img {
      width: 100px;
    }
  }

  .control {
    button {
      position: absolute;
      right: 0;
    }
  }
}

.other {
  margin-top: 30%;

  p {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    text-align: center;
    justify-content: space-between;

    &:before,
    &:after {
      display: block;
      content: '';
      width: 35%;
      height: 1px;
      background-color: #ccc;
    }
  }

  .snsLogin {
    display: flex;
    height: 90px;
    align-content: space-between;
    flex-wrap: wrap;

    .button.google{
      color: #fff;
      background-color: #4285F4;
    }

    .button.facebook{
      color: #fff;
      background-color: #3C5A99;
    }
  }
}
</style>
