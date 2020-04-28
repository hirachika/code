'use strict';

  //要素の準備
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

    const yourBirthDay = {
      year: year.value,
      month: month.value,
      date: date.value
    };

    const today        = new Date(); // 今日
    const berthday     = new Date(yourBirthDay.year, yourBirthDay.month, yourBirthDay.date); // 誕生日年月日
    const nextBerthday = new Date(today.getFullYear(),berthday.getMonth()-1,berthday.getDate()); // 今年の誕生日
    const nextAge      = Number(today.getFullYear() - berthday.getFullYear()); // 今年迎える年齢
    const diffMonth    = Number((today.getMonth() + 1) - berthday.getMonth()); // 誕生日までの差分（月）
    const diffDate     = Number(today.getDate() - berthday.getDate()); // 誕生日までの差分（日）
    const thisDate     = new Date(yourBirthDay.year,(yourBirthDay.month-1),0).getDate();

    if (Math.sign(nextAge) !== 1) {
      result.innerHTML = `まだ生まれていません`;
    }
    else if (today < nextBerthday) {
      result.innerHTML = `あなたは現時点で${nextAge-1}歳${diffMonth+12}ヶ月${diffDate}日です！`;
    }
    else if (today > nextBerthday && Math.sign(diffDate) == 1) {
      console.log(Math.sign(diffDate));
      result.innerHTML = `あなたは現時点で${nextAge}歳${diffMonth}ヶ月${diffDate}日です！！`;
    }
    else if(Math.sign(diffDate) == -1){
      result.innerHTML = `あなたは現時点で${nextAge}歳${diffMonth-1}ヶ月${thisDate+diffDate}日です！！！`;
    }
  });