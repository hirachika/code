'use strict';

  // 初期設定
  const SELECTED_NUMBER     = 5;
  const NUMBER              = 52;
  const BUTTON              = document.getElementsByClassName('porker__start-button');
  const RESULT              = document.getElementsByClassName('porker-game__result');
  const ROLE_NAME           = document.getElementsByClassName('porker__role-name');
  const DEALER_PLAYING_CARD = document.getElementsByClassName('porker__playing-card--dealer');
  const PLAYER_PLAYING_CARD = document.getElementsByClassName('porker__playing-card--player');


  // トランプの枚数を格納
  const PLAYING_CARD_ARRAY = [];
  for (let i = 1; i <= NUMBER; i++) {
    PLAYING_CARD_ARRAY.push(Number(i));
  }

  let SHUFFLE_PLAYING_CARD = PLAYING_CARD_ARRAY.sort(function(){ return Math.random() - 0.5});

  // ディーラーとプレイヤーのカードを格納
  const DEALER_SELECTED_NUMBER = SHUFFLE_PLAYING_CARD.splice(0,SELECTED_NUMBER);
  const PLAYER_SELECTED_NUMBER = SHUFFLE_PLAYING_CARD.splice(0,SELECTED_NUMBER);

  
  for (let i = 0; i < PLAYER_SELECTED_NUMBER.length; i++) {
    DEALER_PLAYING_CARD[0].insertAdjacentHTML('beforeend',`<img src=images/praying-card_${PLAYER_SELECTED_NUMBER[i]}.png>`);
  }



  // すでに選ばれた枚数を削除
  // SHUFFLE_PLAYING_CARD.splice(0,SELECTED_NUMBER);
  // console.log("SHUFFLE_PLAYING_CARD", SHUFFLE_PLAYING_CARD)


  







 
 //  PLAYING_CARD.innerHTML = ;
// img.setAttribute('src', 'images/praying-card_16.png');

// console.log("PLAYING_CARD[0]", PLAYING_CARD[0])

//   BUTTON[0].addEventListener('click',(e)=>{
//     e.preventDefault();
//     console.log('eureka');
//   })
  


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
    BONUS_NUMBER.innerHTML   = `${bonusNumber1},${bonusNumber2}`;

    if (inputNumbersFixed.size === COUNT) {
      RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
    }
    else if (inputNumbersFixed.size === COUNT+1 && (inputNumbers.includes(bonusNumber1) || inputNumbers.includes(bonusNumber2))) {
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
    else if (inputNumbersFixed.size === COUNT+4 && (inputNumbers.includes(bonusNumber1) || inputNumbers.includes(bonusNumber2))) {
      RESULT[0].innerHTML = '6等当選です！';
    }
    else {
      RESULT[0].innerHTML = '残念！ハズレです…';
    }
  });