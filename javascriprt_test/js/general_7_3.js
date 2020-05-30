'use strict';

  // 初期設定
  const WINNING_RESULT  = document.querySelector('.winning-result');
  const USER_NUMBER     = document.querySelector('.winning-result__user');
  const ERROR           = document.getElementsByClassName('error');
  const RESULT          = document.getElementsByClassName('result');
  const VALUES          = document.getElementsByClassName('value');
  const INPUT_VALUE     = Array.from(VALUES);
  const DIGIT           = 6;
  const DECIDED_NUMBER  = 43;
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

      // 入力数字を格納
      let equalsNumbers = [];
      for (const i in INPUT_VALUE) {
        equalsNumbers.push(Number(INPUT_VALUE[i].value));
      }

      // Set型で重複する数字を省く
      let validateNumbers = new Set(equalsNumbers);

      if (!inputValue.match(/^[0-9]{1,2}$/) || inputValue > DECIDED_NUMBER || inputValue == 0) {
        showMessage(`1〜${DECIDED_NUMBER}の異なる数字を入力してください`);
      }
      else if (validateNumbers.size !== DIGIT) {
        showMessage('空欄または重複している数字があります');
      }
      else {
        hideMessage();
      }
    }
  });

  BUTTONS.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // テキストエリアを無効化
      for (const element of VALUES) {
        element.disabled = true;
      }

      // 入力数字を格納
      let INPUT_NUMBERS = [];
      for (const i in INPUT_VALUE) {
        INPUT_NUMBERS.push(Number(INPUT_VALUE[i].value));
      }
      
      WINNING_RESULT.classList.add('active');
      USER_NUMBER.innerHTML = INPUT_NUMBERS;

      // 数字を格納
      const NUMBERS_ARRAY = [];
      for (let i = 1; i <= DECIDED_NUMBER; i++){
        NUMBERS_ARRAY.push(i);
      }

      // シャッフルしてボーナス数字をセット
      NUMBERS_ARRAY.sort(()=>{return Math.random() - 0.5});
      let BONUS_NUMBER = NUMBERS_ARRAY.shift();
      console.log("BONUS_NUMBER", BONUS_NUMBER)
      
      // 1000回分のCOM番号をセット
      let SELECTED_NUMBER = [];
      for (let i = 1; i <= NUMBER_OF_TIMES; i++){
        NUMBERS_ARRAY.sort(()=>{return Math.random() - 0.5});
        SELECTED_NUMBER.push(NUMBERS_ARRAY.slice(0,DIGIT));
      }

      let COUNT_VALUE = 0;
      let verificationNumber = [];

      for (let i = 0; i < SELECTED_NUMBER.length; i++) {  
        // Set型で重複する数字を省く
        verificationNumber = new Set(INPUT_NUMBERS.concat(SELECTED_NUMBER[i]));

        if (verificationNumber.size === DIGIT) {
          COUNT_VALUE++;
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合<br>1等に${COUNT_VALUE}回当選します<br>確率は${COUNT_VALUE / NUMBER_OF_TIMES * 100}%です`;
        }
        else if (verificationNumber.size === DIGIT+1 && INPUT_NUMBERS.includes(BONUS_NUMBER)) {
          COUNT_VALUE++;
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合<br>2等に${COUNT_VALUE}回当選します<br>確率は${COUNT_VALUE / NUMBER_OF_TIMES * 100}%です`;
        }
        else if (verificationNumber.size === DIGIT+1) {
          COUNT_VALUE++;
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合<br>3等に${COUNT_VALUE}回当選します<br>確率は${COUNT_VALUE / NUMBER_OF_TIMES * 100}%です`;
        }
        else if (verificationNumber.size === DIGIT+2) {
          COUNT_VALUE++;
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合<br>4等に${COUNT_VALUE}回当選します<br>確率は${COUNT_VALUE / NUMBER_OF_TIMES * 100}%です`;
        }
        else if (verificationNumber.size === DIGIT+3) {
          COUNT_VALUE++;
          RESULT[0].innerHTML = `${NUMBER_OF_TIMES}回連続で抽選した場合<br>5等に${COUNT_VALUE}回当選します<br>確率は${COUNT_VALUE / NUMBER_OF_TIMES * 100}%です`;
        }
      }
    })
  });



