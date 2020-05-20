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
  const COUNT          = 6;

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

  // 配列をシャッフル後に固定数（COUNT）を格納
  let numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43];
      numberArray = numberArray.sort(function(){ return Math.random() - 0.5});

  // ボーナス数字を格納
  const bonusNumber = numberArray.shift();
  console.log("bonusNumber", bonusNumber)
  
  const numbers = numberArray.slice(0,COUNT);
  console.log("numbers", numbers)

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
        showMessage('1〜43の異なる数字を入力してください');
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

    if (inputNumbersFixed.size === 6) {
      RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
    }
    else if (inputNumbersFixed.size === 7 && inputNumbers.includes(bonusNumber)) {
      RESULT[0].innerHTML = '2等当選です！';
    }
    else if (inputNumbersFixed.size === 7) {
      RESULT[0].innerHTML = '3等当選です！';
    }
    else if (inputNumbersFixed.size === 8) {
      RESULT[0].innerHTML = '4等当選です！';
    }
    else if (inputNumbersFixed.size === 9) {
      RESULT[0].innerHTML = '5等当選です！';
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });