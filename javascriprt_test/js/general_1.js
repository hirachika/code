'use strict';

//要素の準備
  const WEEKLY = ["日", "月", "火", "水", "木", "金", "土"];
  const button = document.querySelector('.button');
  const value  = document.querySelectorAll('.value');
  const result = document.querySelector('.result');
  const error  = document.querySelector('.error');

  // ボタン初期状態（無効）
  button.disabled = 'disabled';

  // エラーメッセージの表示と無効化
  const showMessage = (message) => {
    error.innerHTML = message;
    button.disabled = 'disabled';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    error.innerHTML = '';
    button.disabled = '';
  }

  // 入力チェック
  let validateInputs = (year,month,date) => {
    if(year < 1000 || year > 9999 || date < 1 || date > 31 || month < 1 || month > 12){
      showMessage('空白または入力に誤りがあります。');
    }
    // 30日の月チェック
    else if(month === 4 && date > 30 || month === 6 && date > 30 || month === 9 && date > 30 || month === 11 && date > 30){
      showMessage('1～30の半角数字で入力してください。');
    }
    // 2月チェック
    else if(year % 4 !== 0 && month === 2 && date > 28){
      showMessage('1～28の半角数字で入力してください。');
    }
    // 閏年チェック
    else if((year % 4 === 0 && year % 100 !== 0 && month === 2 && date > 29) || (year % 400 === 0 && month === 2 && date > 29 )){
      showMessage('閏年です。1～29の半角数字で入力してください。');
    }
    else{
      hideMessage();
    }
  }

  value.forEach(target => {
    target.onblur = () => {
      const thisValue  = target.value;
      const yearValue  = Number(value[0].value);
      const monthValue = Number(value[1].value);
      const dateValue  = Number(value[2].value);

      if(thisValue.match(/[^0-9]+/)){
        showMessage('半角数字で入力してください。');
      }
      else if(yearValue !== '' && monthValue !== '' && dateValue !== ''){
        validateInputs(yearValue,monthValue,dateValue);
      }
      else{
        hideMessage();
      }
    }
  });

  //クリックしたら曜日が出力
  button.addEventListener('click',(e) => {
    e.preventDefault();
    const inputDay    = new Date(year.value + "/" + month.value + "/" + date.value);
    result.innerHTML  = 'その日は' + WEEKLY[inputDay.getDay()] + '曜日です！';
  });
