'use strict';

  // 初期設定
  const VALUE  = document.querySelectorAll('.value');
  const ERROR  = document.querySelector('.error');
  const BUTTON = document.querySelector('.button');
  const RESULT = document.querySelector('.result');
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

    //入力されたデータの取得
    var year         = document.getElementById("year").value;
    var month        = document.getElementById("month").value;
    var date         = document.getElementById("date").value;

    //1990/01/01
    var start = new Date(1990,0,1);
    var goal = new Date(2010,11,31);

    //全て入力された日付を日付オブジェクトに変換
    var  scope = new Date(year,month-1,date);

    if(start <=  scope && goal >=  scope){
      result.style.color = 'red';
      result.innerHTML  = '＼範囲内です／';
    }else{
      result.style.color = 'blue';
      result.innerHTML  = '＼範囲外です／';
    }
  });
