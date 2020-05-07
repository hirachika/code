'use strict';

  // 初期設定
  const ERROR  = document.getElementsByClassName('error');
  const BUTTON = document.getElementsByClassName('button');
  BUTTON.disabled = 'disabled';

  const VALUE  = document.getElementsByClassName('value');
  const INPUT_VALUE = Array.from(VALUE);
  
  // エラーメッセージの表示と無効化
  const showMessage = (message = '半角英数で入力してください') => {  
    ERROR[0].innerHTML  = message;
    BUTTON[0].disabled  = 'disabled';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    ERROR[0].innerHTML = '';
    BUTTON[0].disabled = '';
  }

  INPUT_VALUE.forEach(input => {
    input.onblur = (e) => {
      const inputValue = input.value;
      const inputName  = input.name;
      e.preventDefault();
      if (inputName === 'user' && inputValue.match(/[^a-zA-Z0-9]/)) {
        showMessage();
      }
      else if (inputName === 'user' && 6 > inputValue.length || inputValue.length > 32) {
        showMessage('6〜32文字以内で入力してください');
      }
      else if (inputName === 'password' && inputValue.match(/[^a-zA-Z0-9]/)) {
        showMessage();
      }
      else if (inputName === 'password' && 8 > inputValue.length) {
        showMessage('8文字以上で入力してください');
      }
      else if (inputName === 'passwordConfirm' && INPUT_VALUE[1].value !== INPUT_VALUE[2].value) {
        showMessage('入力されたパスワードが一致しません');
      }
      else if (inputName === 'email-first' && !inputValue.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])/)) {
        showMessage('メールアドレスに誤りがあります');
      }
      else if (inputName === 'email-last' && !inputValue.match(/^([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
        showMessage('メールアドレスに誤りがあります');
      }
      else if (inputName === 'tel-first' && !inputValue.match(/^0\d{1,4}$/)) {
        showMessage('電話番号の入力に誤りがあります');
      }
      else if (inputName === 'tel-middle' && !inputValue.match(/^\d{1,4}$/)) {
        showMessage('電話番号の入力に誤りがあります');
      }
      else if (inputName === 'tel-last' && !inputValue.match(/\d{4}$/)) {
        showMessage('電話番号の入力に誤りがあります');
      }
      else{
        hideMessage();
      }
    }
  });
