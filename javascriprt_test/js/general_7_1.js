'use strict';

  // 初期設定
  const WINNING_RESULT      = document.querySelector('.winning-result');
  const USER_NUMBER         = document.querySelector('.winning-result__user');
  const WINNING_NUMBER      = document.querySelector('.winning-result__com');
  const WINNING_PROBABILITY = document.querySelector('.winning-probability');
  const ERROR               = document.getElementsByClassName('error');
  const RESULT              = document.getElementsByClassName('result');
  const VALUES              = document.getElementsByClassName('value');
  const INPUT_VALUE         = Array.from(VALUES);
  const DECIDED_NUMBER      = 9;
  const CONTINUOUS          = 1000;

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
  let NUMBER_ARRAY = [];
  for (let i = 0; i <= DECIDED_NUMBER; i++){
    NUMBER_ARRAY.push(i);
  }

  const shuffleNumbers = () => {
    return NUMBER_ARRAY.sort(function(){return Math.random() - 0.5}).slice(0,3).join('');
  }
  
  let 連続したシャッフル数字 = [];
  for (let i = 1; i <= CONTINUOUS; i++){
    連続したシャッフル数字.push(shuffleNumbers());
  }

  // 入力チェック
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

    // 入力数字を格納
    let inputNumbers = [];
    for (const i in INPUT_VALUE) {
      inputNumbers.push(INPUT_VALUE[i].value);
    }
    console.log(inputNumbers.join(''));
    
    USER_NUMBER.innerHTML    = inputNumbers.join('');
    WINNING_NUMBER.innerHTML = 連続したシャッフル数字[0];

    let カウント;

    for (let i = 0; i < 連続したシャッフル数字.length; i++) {
      if (inputNumbers.join('') == 連続したシャッフル数字[i]) {
        カウント++;
        console.log(カウント);
      }
      // else if (inputNumbers.toString() !== numbers.toString()) {
      //   inputNumbers.sort((a, b) => {return a - b});
      //   numbers.sort((a, b) => {return a - b});
  
      //   if (inputNumbers.toString() === numbers.toString()) {
      //     RESULT[0].innerHTML = 'おしい！ボックス当選です！';
      //   }
      //   else {
      //     RESULT[0].innerHTML = '残念！ハズレです…';
      //   }
      // }
      // else {
      //   RESULT[0].innerHTML = '残念！ハズレです…';
      // }
    }
  });