'use strict';

  // 初期設定
  const ERROR  = document.getElementsByClassName('error');
  const BUTTON = document.getElementsByClassName('button');
  BUTTON.disabled = 'disabled';

  const VALUE  = document.getElementsByClassName('value');
  const INPUT_VALUE = Array.from(VALUE);
  
  // エラーメッセージの表示と無効化
  const showMessage = (message = '空白または入力に誤りがあります') => {  
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
      e.preventDefault();

      const inputValue   = input.value;
      const inputName    = input.name;
      const DIGIT_NUMBER = (INPUT_VALUE[5].value+INPUT_VALUE[6].value+INPUT_VALUE[7].value).length;
      
      if (inputName === 'user' && inputValue.match(/[^a-zA-Z0-9]/)) {
        showMessage('半角英数で入力してください');
      }
      else if (inputName === 'user' && 6 > inputValue.length || inputValue.length > 32) {
        showMessage('6〜32文字以内で入力してください');
      }
      else if (inputName === 'password' && inputValue.match(/[^a-zA-Z0-9]/)) {
        showMessage('半角英数で入力してください');
      }
      else if (inputName === 'password' && 8 > inputValue.length) {
        showMessage('8文字以上で入力してください');
      }
      else if (inputName === 'passwordConfirm' && INPUT_VALUE[1].value !== INPUT_VALUE[2].value) {
        showMessage('入力されたパスワードが一致しません');
      }
      else if (inputName === 'email-first' && !inputValue.match(/^([a-zA-Z0-9._-])+$/)) {
        showMessage();
      }
      else if (inputName === 'email-last' && !inputValue.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9.-]*\.[a-zA-Z]{1,}$/)) {
        showMessage();
      }
      else if (inputName === 'tel-first') {
        if (inputValue.length === 2 && !inputValue.match(/^0\d{1}$/) || DIGIT_NUMBER <= 9) {
          showMessage();
        }
        else if (inputValue.length === 3 && !inputValue.match(/^(050|060|070|080|090)$/) || DIGIT_NUMBER <= 9) {
          showMessage();
        }
        else {
          hideMessage();
        }
      }
      else if (inputName === 'tel-middle' && !inputValue.match(/^\d{2,4}$/)) {
        showMessage('電話番号の入力に誤りがあります');
      }
      else if (inputName === 'tel-last' && !inputValue.match(/\d{3,4}$/)) {
        showMessage('電話番号の入力に誤りがあります');
      }
      else{
        hideMessage();
      }
    }
  });