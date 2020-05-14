'use strict';

  // 初期設定
  const WINNING_RESULT = document.querySelector('.winning-result');
  const USER_NUMBER    = document.querySelector('.winning-result__user');
  const WINNING_NUMBER = document.querySelector('.winning-result__com');
  const ERROR          = document.getElementsByClassName('error');
  const RESULT         = document.getElementsByClassName('result');
  const VALUES         = document.getElementsByClassName('value');
  const INPUT_VALUE    = Array.from(VALUES);

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

  // 配列をシャッフル後6つ数字を格納
  const NUMBER_ARRAY = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43];
  let numbers = NUMBER_ARRAY.sort(function(){ return Math.random() - 0.5});
      numbers = numbers.slice(0,6);
      numbers = [1,2,3,4,5,6];

  // ボーナス数字を設定
  const BONUS_NUMBER = numbers[0];
  console.log("BONUS_NUMBER", BONUS_NUMBER)

  INPUT_VALUE.forEach(input => {
    input.onblur = (e) => {
      e.preventDefault();
      const inputValue = input.value;
      if (!inputValue.match(/^[0-9]{1,2}$/)) {
        showMessage('1〜43の数値を入力してください');
      }
      else{
        hideMessage();
      }
    }
  });

  BUTTON[0].addEventListener('click', (e) => {
    e.preventDefault();
    WINNING_RESULT.classList.add('active');

    // ボタンを押したらテキストエリアを無効化
    for (const iterator of VALUES) {
      iterator.disabled = true;
    }

    let inputNumbers = [
      Number(INPUT_VALUE[0].value),
      Number(INPUT_VALUE[1].value),
      Number(INPUT_VALUE[2].value),
      Number(INPUT_VALUE[3].value),
      Number(INPUT_VALUE[4].value),
      Number(INPUT_VALUE[5].value)
    ];

    USER_NUMBER.innerHTML    = inputNumbers;
    WINNING_NUMBER.innerHTML = numbers;

    if (inputNumbers.toString() === numbers.toString()) {
      RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
    }
    else if (inputNumbers.toString() !== numbers.toString()) {
      inputNumbers.sort((a, b) => {return a - b});
      numbers.sort((a, b) => {return a - b});

      if (inputNumbers.toString() === numbers.toString()) {
        RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
      }
      else {
        RESULT[0].innerHTML = '残念！ハズレです…';
      }
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });