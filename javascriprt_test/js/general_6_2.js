'use strict';

  // 初期設定
  const WINNING_RESULT = document.querySelector('.winning-result');
  const USER_NUMBER    = document.querySelector('.winning-result__user');
  const WINNING_NUMBER = document.querySelector('.winning-result__com');
  const BONUS_NUMBER   = document.querySelector('.winning-result__bonus');
  const ERROR          = document.getElementsByClassName('error');
  const RESULT         = document.getElementsByClassName('result');
  const VALUES         = document.getElementsByClassName('value');
  const INPUT_VALUE    = Array.from(VALUES);
  const COUNT          = 7;
  const DECIDED_NUMBER = 37;

  // ボタン初期状態
  const BUTTON         = document.getElementsByClassName('button');
  BUTTON[0].disabled   = 'disabled';
  
  // エラーメッセージの表示と無効化
  const showMessage = (message) => {  
    ERROR[0].innerHTML  = message;
    BUTTON[0].disabled  = 'disabled';
  }

  // エラーメッセージの解除とボタンの有効化
  const hideMessage = () => {
    ERROR[0].innerHTML = '';
    BUTTON[0].disabled = '';
  }

  // 数字を格納
  let numberArray = [];
  for (let i = 1; i <= DECIDED_NUMBER; i++){
    numberArray.push(i);
  }

  // シャッフル後にボーナス数字と当選番号を格納
  numberArray = numberArray.sort(function(){ return Math.random() - 0.5});
  const bonusNumber = numberArray.splice(0,2);
  const numbers     = numberArray.slice(0,COUNT);

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

      if (!inputValue.match(/^[0-9]{1,2}$/) || inputValue > 43 || inputValue == 0) {
        showMessage('1〜37の異なる数字を入力してください');
      }
      else if (validateNumbers.size !== COUNT) {
        showMessage('空欄または重複している数字があります');
      }
      else {
        hideMessage();
      }
    }
  });

  BUTTON[0].addEventListener('click', (e) => {
    e.preventDefault();
    WINNING_RESULT.classList.add('active');

    // 入力数字を格納
    let inputNumbers = [];
    for (const i in INPUT_VALUE) {
      inputNumbers.push(Number(INPUT_VALUE[i].value));
    }

    // Set型で重複する数字を省く
    let inputNumbersFixed = new Set(inputNumbers.concat(numbers));

    // ボタンを押したらテキストエリアを無効化
    for (const iterator of VALUES) {
      iterator.disabled = true;
    }

    USER_NUMBER.innerHTML    = inputNumbers;
    WINNING_NUMBER.innerHTML = numbers;
    BONUS_NUMBER.innerHTML   = bonusNumber;
    console.log("bonusNumber", bonusNumber)

    if (inputNumbersFixed.size === COUNT) {
      RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
    }
    else if (inputNumbersFixed.size === COUNT+1 && inputNumbers.includes(bonusNumber)) {
      console.log("bonusNumber", bonusNumber)
      RESULT[0].innerHTML = '2等当選です！';
    }
    else if (inputNumbersFixed.size === COUNT+1) {
      RESULT[0].innerHTML = '3等当選です！';
    }
    else if (inputNumbersFixed.size === COUNT+2) {
      RESULT[0].innerHTML = '4等当選です！';
    }
    else if (inputNumbersFixed.size === COUNT+3) {
      RESULT[0].innerHTML = '5等当選です！';
    }
    else if (inputNumbersFixed.size === COUNT+4 && inputNumbers.includes(bonusNumber)) {
      console.log("bonusNumber", bonusNumber)
      RESULT[0].innerHTML = '6等当選です！';
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });