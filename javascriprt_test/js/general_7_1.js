'use strict';

  // 初期設定
  const WINNING_RESULT  = document.querySelector('.winning-result');
  const USER_NUMBER     = document.querySelector('.winning-result__user');
  const ERROR           = document.getElementsByClassName('error');
  const RESULT          = document.getElementsByClassName('result');
  const VALUES          = document.getElementsByClassName('value');
  const INPUT_VALUE     = Array.from(VALUES);
  const DIGIT           = 3;
  const DECIDED_NUMBER  = 9;
  const NUMBER_OF_TIMES = 1000;
  
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

  BUTTONS.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // 数字を格納
      const NUMBERS_ARRAY = [];
      for (let i = 1; i <= DIGIT; i++) {
        for (let i = 0; i <= DECIDED_NUMBER; i++){
          NUMBERS_ARRAY.push(i);
        }
      }

      // シャッフルして固定数を格納
      let SELECTED_NUMBER = [];
      for (let i = 1; i <= NUMBER_OF_TIMES; i++){
        NUMBERS_ARRAY.sort(function(){return Math.random() - 0.5});
        SELECTED_NUMBER.push(NUMBERS_ARRAY.slice(0,DIGIT).join(''));
      }

      // テキストエリアを無効化
      for (const element of VALUES) {
        element.disabled = true;
      }

      // 入力数字を格納
      let inputNumbers = [];
      for (const element of INPUT_VALUE) {
        inputNumbers.push(element.value);
      }

      WINNING_RESULT.classList.add('active');
      USER_NUMBER.innerHTML = inputNumbers.join('');

      let countUpValue = 0;
      let countUp = (value1,value2) => {
        if (value1 === value2) {
          countUpValue++;
        }
      }

      for (const item of SELECTED_NUMBER) {
        if (button.name === 'straight-check') {
          countUp(inputNumbers.join(''),item);
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合${countUpValue}回当選します<br>ストレート当選確率は${countUpValue / NUMBER_OF_TIMES * 100}%です`;
        }
        else if (button.name === 'box-check') {
          let sortedNumbers = inputNumbers.sort().join('');
          let SORTED_NUMBERS_ARRAY = item.split('').sort().join('');
          countUp(sortedNumbers,SORTED_NUMBERS_ARRAY);
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合${countUpValue}回当選します<br>ボックス当選確率は${countUpValue / NUMBER_OF_TIMES * 100}%です`;
        }
      }
    })
  });

