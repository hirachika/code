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
    ERROR.innerHTML = message;
    BUTTON.disabled = 'disabled';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    ERROR.innerHTML = '';
    BUTTON.disabled = '';
  }

  // 入力チェック
  const validateInputs = (year,month,date) => {
    if(year < 1000 || year > 9999 || date < 1 || date > 31 || month < 1 || month > 12){
      showMessage('空白または入力に誤りがあります。');
    }
    // 30日の月判定
    else if(month.match(/(4|6|9|11)/) && date > 30){
      showMessage('1～30の半角数字で入力してください');
    }
    else if(month === 2){
      閏年();
    }
    else{
      console.log('eureka');
      hideMessage();
    }
  }

  const validateLeapYear = (y,d) => {
    // console.log(`閏年判定へよこうそ`);
    if((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0) && d > 29){
      showMessage('閏年です。1～29の半角数字で入力してください');
    }
    else{
      // hideMessage();
      console.log(`閏年ではありません`);
      // break;
    }
  }


  VALUE.forEach(input => {
    input.onblur = () => {
      // 文字列で判定するもの
      const year  = VALUE[0].value;
      const month = VALUE[1].value;
      const day   = VALUE[2].value;
      const date  = `${year}/${month}/${day}`;

      if(input.value.match(/[^0-9]+/) || !date.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
        showMessage('空白または入力に誤りがあります。');
      }      
      // else if(year < 1000 || year > 9999 || day < 1 || day > 31 || month < 1 || month > 12){
      // 2月 && 29日以上であれば閏年判定へ
      else if(month == 2 && day > 28){
        validateLeapYear(year,day);
      }
      // else if(month.match(/(4|6|9|11)/)){
      //   showMessage('1～30の半角数字で入力してください');
      // }
      else{
        hideMessage();
      }
    }
  });

  //クリックしたら曜日が出力
  BUTTON.addEventListener('click',(e) => {
    e.preventDefault();
    const inputDay    = new Date(year.value + "/" + month.value + "/" + date.value);
    RESULT.innerHTML  = 'その日は' + WEEKLY[inputDay.getDay()] + '曜日です！';
  });
