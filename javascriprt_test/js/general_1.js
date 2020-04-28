'use strict';

//要素の準備
  const WEEKLY = ["日", "月", "火", "水", "木", "金", "土"];
  const ERROR  = document.querySelector('.error');
  const RESULT = document.querySelector('.result');
  const BUTTON = document.querySelector('.button');
  const VALUE  = document.querySelectorAll('.value');

  // ボタン初期状態（無効）
  BUTTON.disabled = 'disabled';

  // エラーメッセージの表示と無効化
  const showMessage = (message = '空白または入力に誤りがあります') => {
    ERROR.innerHTML  = message;
    BUTTON.disabled  = 'disabled';
    RESULT.innerHTML = '';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    ERROR.innerHTML = '';
    BUTTON.disabled = '';
  }

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

  //クリックしたら曜日が出力
  BUTTON.addEventListener('click',(e) => {
    e.preventDefault();
    const inputDate  = new Date(`${year.value}/${month.value}/${date.value}`);
    RESULT.innerHTML = `その日は${WEEKLY[inputDate.getDay()]}曜日です！`;
  });