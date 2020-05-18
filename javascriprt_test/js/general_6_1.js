'use strict';

  // 初期設定
  const WINNING_RESULT = document.querySelector('.winning-result');
  const USER_NUMBER    = document.querySelector('.winning-result__user');
  const WINNING_NUMBER = document.querySelector('.winning-result__com');
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
  const NUMBER_ARRAY = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43];
  let numbers = NUMBER_ARRAY.sort(function(){ return Math.random() - 0.5});
      numbers = numbers.slice(0,COUNT);

  // ボーナス数字を格納
  let bonusNumber = numbers.slice(0,1);

  // 検証用数字（あとで消す）
  numbers = [3,1,3,4,5,6];
  console.log("numbers", numbers)
  bonusNumber = [1];

  // 入力チェック
  INPUT_VALUE.forEach(input => {
    input.onblur = (e) => {
      e.preventDefault();
      const inputValue = input.value;
      if (!inputValue.match(/^[1-9]{1,2}$/) || inputValue.length > 43) {
        showMessage('1〜43の異なる数字を入力してください');
      }
      else{
        hideMessage();
      }
    }
  });

  BUTTON[0].addEventListener('click', (e) => {
    e.preventDefault();
    WINNING_RESULT.classList.add('active');

    // ユーザーが入力した数字を格納
    let inputNumbers = new Array();
    for (let i = 0; i < COUNT; i++) {
      inputNumbers.push(Number(INPUT_VALUE[i].value));
    }

    let inputNumbers = new Set(inputNumbers);
    console.log("inputNumbers", inputNumbers)
    if () {

    }
    return newInputNumbers.size != inputNumbers.length;
    console.log("newInputNumbers", newInputNumbers)

      // showMessage('数字が重複しています。入力し直してください');
      // let NEW_NUMBER_ARRAY = NUMBER_ARRAY.filter(value => value !== Number(INPUT_VALUE[i].value));

      // ボタンを押したらテキストエリアを無効化
      // for (const iterator of VALUES) {
      //   iterator.disabled = true;
      // }



    USER_NUMBER.innerHTML    = inputNumbers;
    WINNING_NUMBER.innerHTML = numbers;

    // ソートする
    inputNumbers.sort((a, b) => {return a - b});
    console.log("inputNumbers", inputNumbers)
    numbers.sort((a, b) => {return a - b});
    console.log("numbers", numbers)

    // const NEW_ARRAY = [];
    // console.log("NEW_ARRAY", NEW_ARRAY)

    // numbers.concat(inputNumbers).forEach(item => {
    //   if (numbers.includes(item) && !inputNumbers.includes(item)) {
    //     NEW_ARRAY.push(item);
    //     console.log(NEW_ARRAY);
    //   } 
    //   else if (!numbers.includes(item) && inputNumbers.includes(item)) {
    //     NEW_ARRAY.push(item);
    //     console.log(NEW_ARRAY);
    //   }
    // })

    if (inputNumbers.toString() === numbers.toString()) {
      RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
    }
    // ボーナス数字が存在する場合
    else if (inputNumbers.toString() !== numbers.toString() && inputNumbers.includes(bonusNumber)) {
      console.log('BONUS_NUMBERがあります');
      // const index = inputNumbers.findIndex(n => n === BONUS_NUMBER);
      // console.log("index", index)
      // console.log("inputNumbers", inputNumbers)

    // RESULT[0].innerHTML = '2等当選です！';
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });

