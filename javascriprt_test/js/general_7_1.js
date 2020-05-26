'use strict';

  // 初期設定
  const WINNING_RESULT = document.querySelector('.winning-result');
  const USER_NUMBER    = document.querySelector('.winning-result__user');
  const WINNING_NUMBER = document.querySelector('.winning-result__com');
  const ERROR          = document.getElementsByClassName('error');
  const RESULT         = document.getElementsByClassName('result');
  const VALUES         = document.getElementsByClassName('value');
  const INPUT_VALUE    = Array.from(VALUES);
  const DECIDED_NUMBER = 9;
  const CONTINUOUS     = 10;
  
  // ボタン初期状態
  const BUTTONS = document.querySelectorAll('.button');
  BUTTONS.forEach(button => { button.disabled = 'disabled'; });
  
  // エラーメッセージ表示とボタン無効化
  const showMessage = (message) => {  
    ERROR[0].innerHTML = message;
    BUTTONS.forEach(button => { button.disabled = 'disabled'; });
  }

  // エラーメッセージ解除とボタン有効化
  const hideMessage = () => {
    ERROR[0].innerHTML = '';
    BUTTONS.forEach(button => { button.disabled = ''; });
  }

  // 入力チェック
  INPUT_VALUE.forEach(input => {
    input.onblur = (e) => {
      e.preventDefault();
      const inputValue = input.value;
      if (!inputValue || !inputValue.match(/^[0-9]{1}$/)) {
        showMessage('0〜9の数値を一桁ずつ入力してください');
      }
      else{
        hideMessage();
      }
    }
  });

  // 数字を格納
  const NUMBERS_ARRAY = [];
  for (let i = 0; i <= DECIDED_NUMBER; i++){
    NUMBERS_ARRAY.push(i);
  }

  // シャッフルして文字列として連結
  const shuffleNumbers = () => {
    return NUMBERS_ARRAY.sort(function(){return Math.random() - 0.5}).slice(0,3).join('');
  }

  // 連続抽選回数を格納
  let SHUFFLE_NUMBERS_ARRAY = [];
  for (let i = 1; i <= CONTINUOUS; i++){
    SHUFFLE_NUMBERS_ARRAY.push(shuffleNumbers());
  }

  BUTTONS.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      WINNING_RESULT.classList.add('active');

      // ボタンを押したらテキストエリアを無効化
      for (const element of VALUES) {
        element.disabled = true;
      }

      // 入力数字を格納
      let inputNumbers = [];
      for (const element of INPUT_VALUE) {
        inputNumbers.push(element.value);
      }

      USER_NUMBER.innerHTML    = inputNumbers.join('');
      WINNING_NUMBER.innerHTML = SHUFFLE_NUMBERS_ARRAY[0];

      let countUpValue = 0;
      let countUp = (eureka) => {
        for (const item of SHUFFLE_NUMBERS_ARRAY) {
          if (eureka === item) {
            countUpValue++;
            console.log("countUp -> countUpValue", countUpValue)
          }
        }
      }

      if (button.name === 'straight-check') {
        countUp(inputNumbers.join(''));
        RESULT[0].innerHTML = `${CONTINUOUS}回連続で抽選した場合${countUpValue}回当選します<br>ストレート当選確率は${countUpValue / CONTINUOUS * 100}%です`;
      }
      else if (button.name === 'box-check') {
        
        console.log(SHUFFLE_NUMBERS_ARRAY)
        // item.sort((a, b) => {return a - b});
        // countUp();
      }
    })
  });

