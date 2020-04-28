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
  const showMessage = (message) => {
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
        console.log('空白と半角数字の正否判定');
        showMessage('空白または入力に誤りがあります');
      }
      // 西暦と月の正否判定
      else if(year < 1000 || year > 9999 || month > 12 || day > 31){
        console.log('西暦と月の正否判定');
        showMessage('空白または入力に誤りがあります');
        // 4,6,9,11月の日数の正否判定
        if (day > 30) {
          if (month === 4,6,9,11) {
            showMessage('1～30の半角数字で入力してください');
          }
          else {
            showMessage('1～31の半角数字で入力してください');
          }
        }
        else {
          hideMessage();
        }
      }

      // 2月判定
      else if (month == 2 && day > 28) {
        // 29日以上は閏年判定
        if (day > 29) {
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            showMessage('閏年です。1～29の半角数字で入力してください');
          }
          else {
            showMessage('1～28の半角数字で入力してください');
          }
        }
        else {
          hideMessage();
        }
      }
      else{
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