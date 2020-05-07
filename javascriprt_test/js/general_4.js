'use strict';

  // 初期設定
  const user     = document.getElementById('user');
  const tel      = document.querySelectorAll('.tel');
  const mail     = document.querySelectorAll('.mail');
  const password = document.querySelectorAll('.password');
  const button   = document.querySelector('button');

  // エラーメッセージの作成
  let p = document.createElement('p');
      p.className = 'error';

  // エラー時の処理
  function errorAction(target){
    p.innerHTML = '入力内容を確認してください';
    target.closest('.form__list').appendChild(p);
    button.disabled   = "disabled";
  }

  function clearAction(){
    p.innerHTML     = '';
    button.disabled = '';
  }

  // ユーザー名
  user.addEventListener('blur',function(){
    let value = this.value;
    if(6 > value.length || value.length > 32 || value.match(/[^a-zA-Z0-9]/)){
      errorAction(this);
    }
    else{
      clearAction();
    }
  },false);

  // パスワード
  for (const i of password.keys()) {
    password[i].addEventListener('blur',function(){
      let value = this.value;
      if(8 > value.length || value.match(/[^a-zA-Z0-9]/)){
        errorAction(this);
      }
      else{
        clearAction();
        password[1].addEventListener('blur',function(){
          if(password[0].value !== password[1].value){
            p.innerHTML = 'パスワードが一致していません';
          }
          else{
            clearAction();
          }
        });
      }
    },false);
  };

  // メールアドレス
  mail.forEach(i => {
    i.addEventListener('blur',function(){
      let value = this.value;
      if(value === '' || value.match(/[^a-zA-Z0-9_.-]/)){
        errorAction(this);
      }
      else{       
        clearAction();
      }
    },false);
  });

  // 電話番号
  for (const i of tel.keys()) {
    tel[i].addEventListener('blur',function(){
      let value = this.value;
      let valueTotal = tel[0].value+tel[1].value+tel[2].value;
      if(value === '' || value.match(/[^0-9]/)){
        errorAction(this);
      }
      else if(valueTotal.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)){
        errorAction(this);
      }
      else{
        clearAction();
      }
    },false);
  };
