'use strict';

  // 初期設定
  const VALUE  = document.querySelectorAll('.value');
  const ERROR  = document.querySelector('.error');
  const BUTTON = document.querySelector('.button');
  BUTTON.disabled = 'disabled';

  // エラーメッセージの表示と無効化
  const showMessage = (message = '空白または入力に誤りがあります') => {  
    ERROR.innerHTML  = message;
    BUTTON.disabled  = 'disabled';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    ERROR.innerHTML = '';
    BUTTON.disabled = '';
  }

  // フォーカスが外れたら入力内容チェック
  VALUE.forEach(input => {
    input.onblur = () => {
      const year  = Number(VALUE[0].value);
      const month = Number(VALUE[1].value);
      const day   = Number(VALUE[2].value);

      // 空白と半角数字の正否判定
      if (!Number(input.value) || input.value.match(/[^0-9]+/)) {
        showMessage();
      }
      // 西暦と月の正否判定
      else if (year < 1000 || year > 9999 || month > 12) {
        showMessage();
      }
      else if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10  || month === 12) && day > 31) {
        showMessage('1～31の半角数字で入力してください');
      }
      else if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
        showMessage('1～30の半角数字で入力してください');
      }
      else if (month === 2 && day > 29) {
        showMessage('1～28の半角数字で入力してください');
      }
      else if (month === 2 && day > 28) {
        showMessage('1～28の半角数字で入力してください');
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          hideMessage();
        }
        else {
          showMessage('1～28の半角数字で入力してください');
        }
      }
      else {
        hideMessage();
      }
    }
  });

  // クリックしたら誕生日を判定
  BUTTON.addEventListener('click',(e) => {
    e.preventDefault();

      // 今日と誕生日の差を取得
      const TODAY    = new Date();
      const BIRTHDAY = new Date(VALUE[0].value, VALUE[1].value - 1 , VALUE[2].value);
      const SET_TIME = TODAY - BIRTHDAY;

      // 日数にする
      const DIFF_DAYS     = SET_TIME / (1000 * 3600 * 24);
      console.log("DIFF_DAYS", DIFF_DAYS)
      const MONTH_AVERAGE = 365 / 12;
      const CURRENT_AGE   = Math.floor(DIFF_DAYS / 365);
      const PASSED_MONTH  = Math.floor((DIFF_DAYS - 365 * CURRENT_AGE) / MONTH_AVERAGE);
      const PASSED_DAYS   = Math.floor((DIFF_DAYS - 365 * CURRENT_AGE) - (PASSED_MONTH * MONTH_AVERAGE));

      document.querySelector('.result').innerHTML = `あなたは現時点で${CURRENT_AGE}歳${PASSED_MONTH}ヶ月${PASSED_DAYS}日です`;
  });