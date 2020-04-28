'use strict';

//要素の準備
  const value  = document.querySelectorAll('.value');
  const button = document.querySelector('.button');
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

  // フォーカスが外れたら入力内容チェック
  value.forEach(target => {
    target.onblur = () => {
      const thisValue  = target.value;
      const yearValue  = Number(value[0].value);
      const monthValue = Number(value[1].value);
      const dateValue  = Number(value[2].value);

      if (thisValue.match(/[^0-9]+/)) {
        showMessage('半角数字で入力してください。');
      }
      else if (yearValue < 1000 || yearValue > 9999 || dateValue < 1 || dateValue > 31 || monthValue < 1 || monthValue > 12) {
        showMessage('空白または入力に誤りがあります。');
      }
      // 30日の月チェック
      else if (monthValue === 4 && dateValue > 30 || monthValue === 6 && dateValue > 30 || monthValue === 9 && dateValue > 30 || monthValue === 11 && dateValue > 30) {
        showMessage('1～30の半角数字で入力してください。');
      }
      // 2月チェック
      else if (yearValue % 4 !== 0 && monthValue === 2 && dateValue > 28) {
        showMessage('1～28の半角数字で入力してください。');
      }
      // 閏年チェック
      else if ((yearValue % 4 === 0 && yearValue % 100 !== 0 && monthValue === 2 && dateValue > 29) || (yearValue % 400 === 0 && monthValue === 2 && dateValue > 29 )) {
        showMessage('閏年です。1～29の半角数字で入力してください。');
      }
      else{
        hideMessage();
      }
    }
  });

  // クリックしたら誕生日を判定
  button.addEventListener('click',(e) => {
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