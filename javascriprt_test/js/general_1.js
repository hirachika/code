'use strict';

//要素の準備
  const weekly = ["日", "月", "火", "水", "木", "金", "土"];
  const value  = document.querySelectorAll('.value');
  const button = document.querySelector('.button');
  const result = document.querySelector('.result');
  const error  = document.querySelector('.error');

  // ボタン初期状態無効
  button.disabled = 'disabled';

  // エラーメッセージ
  let validation = (errorMessage) => {
    error.innerHTML = errorMessage;
  }

  // エラーメッセージの解除とボタンの有効化
  let clearAction = () => {
    error.innerHTML = '';
    button.disabled  = '';
  }

  // 入力チェック
  let check = (year,month,date) => {
    // 共通エラーチェック
    if(year < 1000 || year > 9999 || date < 1 || date > 31 || month < 1 || month > 12){
      validation('空白または入力に誤りがあります。');
    }
    // 30日の月チェック
    else if(month === 4 && date > 30 || month === 6 && date > 30 || month === 9 && date > 30 || month === 11 && date > 30){
      validation('空白または入力に誤りがあります。');
    }
    // 2月チェック
    else if(year % 4 !== 0 && month === 2 && date > 28){
      validation('1～28の半角数字で入力してください。');
    }
    // 閏年チェック
    else if(year % 4 === 0 && month === 2 && date > 29){
      validation('閏年です。1～29の半角数字で入力してください。');
    }
    else{
      clearAction();
    }
  }

  value.forEach(target => {    
    target.onblur = () => {
      let thisValue  = target.value;
      let yearValue  = Number(value[0].value);
      let monthValue = Number(value[1].value);
      let dateValue  = Number(value[2].value);

      if(thisValue.match(/[^0-9]+/)){
        validation('半角数字で入力してください。');
      }
      else if(yearValue !== '' && monthValue !== '' && dateValue !== ''){
        check(yearValue,monthValue,dateValue);
      }
      else{
        clearAction();
      }
    }
  });

  //クリックしたら曜日が出力
  button.addEventListener('click',(e) => {
    e.preventDefault();
    let inputDay      = new Date(year.value + "/" + month.value + "/" + date.value);
    result.innerHTML  = '＼その日は' + weekly[inputDay.getDay()] + '曜日です／';
  });
