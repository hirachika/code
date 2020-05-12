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

  // 配列をシャッフルそのうち3個取り出す
  const NUMBER_ARRAY = [0,1,2,3,4,5,6,7,8,9];
  let numbers = NUMBER_ARRAY.sort(function(){ return Math.random() - 0.5});
      numbers = numbers.slice(0,3);

  INPUT_VALUE.forEach(input => {
    input.onblur = (e) => {
      e.preventDefault();
      const inputValue = input.value;
      if (!inputValue.match(/^[0-9]{1}$/)) {
        showMessage('0〜9の数値を一桁ずつ入力してください');
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
      Number(INPUT_VALUE[2].value)
    ];

    USER_NUMBER.innerHTML    = inputNumbers;
    WINNING_NUMBER.innerHTML = numbers;

    if (inputNumbers.toString() === numbers.toString()) {
      RESULT[0].innerHTML = 'おめでとうございます！ストレート当選です！';
    }
    else if (inputNumbers.toString() !== numbers.toString()) {
      inputNumbers.sort((a, b) => {return a - b});
      numbers.sort((a, b) => {return a - b});

      if (inputNumbers.toString() === numbers.toString()) {
        RESULT[0].innerHTML = 'おしい！ボックス当選です！';
      }
      else {
        RESULT[0].innerHTML = '残念！ハズレです…';
      }
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });