'use strict';

  // 要素の準備
  const PLAYER_CARDS = document.getElementsByClassName('porker__playing-card');
  const PLAYER_CARD  = Array.from(PLAYER_CARDS);
  const ROLE_NAMES   = document.getElementsByClassName('porker__role-name');
  const ROLE_NAME    = Array.from(ROLE_NAMES);
  const BUTTON       = document.getElementsByClassName('porker__start-button');
  const RESULT       = document.getElementsByClassName('porker-game__result');
  const HAND         = 5;

  // トランプの画像を格納
  const CARD_ARRAY = [];
  for (let i = 1; i <= 13; i++) {
    CARD_ARRAY.push(`club${i}`,`heart${i}`,`diamond${i}`,`spade${i}`);
  }
  
  // シャッフルしてカードをそれぞれ格納
  // const SHUFFLE_CARD_ARRAY = CARD_ARRAY.sort(function(){ return Math.random() - 0.5});
  // const DEALER_CARD_ARRAY  = SHUFFLE_CARD_ARRAY.splice(0,HAND);
  // const PLAYER_CARD_ARRAY  = SHUFFLE_CARD_ARRAY.splice(0,HAND);

  // デバッグ用　※最後に消す
  const DEALER_CARD_ARRAY = ['heart1','heart2','heart2','heart12','heart6'];

  const distributeCard = (array,element) => {
    for (const item of array) {
      element.insertAdjacentHTML('beforeend',`<img src=images/${item}.png>`);
    }
  }

  distributeCard(DEALER_CARD_ARRAY,PLAYER_CARD[0]);
  // distributeCard(PLAYER_CARD_ARRAY,PLAYER_CARD[1]);

  // 文字列と数字を抜き出す
  const SUIT = [];
  const NUMERIC = [];
  for (const item of DEALER_CARD_ARRAY) {
    SUIT.push(item.replace(/\d+/g, ''));
    NUMERIC.push(item.replace(/[^0-9]/g, ''));
  }

  // 重複を省いた配列をセット
  let setArrayNumeric = new Set(NUMERIC);
  let setArraySuit    = new Set(SUIT);

  // 配列の中身の合計　※合計が高いほど強い
  let sum = 0;
  for (const item of NUMERIC) {
    sum += Number(item);
  }
  
  // 役名を判定
  if (setArrayNumeric.size === 4) {
    ROLE_NAME[0].innerHTML = 'A PAIR';
  }
  else if (setArrayNumeric.size === 5 && sum % 5 == 0 && setArraySuit.size > 1) {
    ROLE_NAME[0].innerHTML = 'STRAIGHT';
  }
  else if (setArrayNumeric.size === 5 && setArraySuit.size === 1 && sum > 47) {
    ROLE_NAME[0].innerHTML = 'FLUSH';
  }
  else if (setArrayNumeric.size === 5 && sum % 5 == 0 && setArraySuit.size === 1) {
    ROLE_NAME[0].innerHTML = 'STRAIGHT FLUSH';
  }
  else if (setArrayNumeric.size === 5 && setArraySuit.size === 1 && sum === 47) {
    ROLE_NAME[0].innerHTML = 'ROYAL FLUSH';
  }
  else {    
    let counts = {};
    let tmp = [];
    for (const key of NUMERIC) {
      counts[key] = (counts[key])? counts[key] + 1 : 1 ;
    }
    for (const key in counts) {
      tmp.push(counts[key]);
      tmp.sort((a, b) => {return a - b});
  
      if (tmp.toString() === '1,2,2') {
        ROLE_NAME[0].innerHTML = 'TWO PAIR';
      }
      else if (tmp.toString() === '1,1,3') {
        ROLE_NAME[0].innerHTML = 'THREE OF A KIND';
      }
      else if (tmp.toString() === '2,3') {
        ROLE_NAME[0].innerHTML = 'A FULL HOUSE';
      }
      else if (tmp.toString() === '1,4') {
        ROLE_NAME[0].innerHTML = 'FOUR OF A KIND';
      }
      else {
        ROLE_NAME[0].innerHTML = 'HIGH CARD';
      }
    }
  }



  // すでに選ばれた枚数を削除
  // SHUFFLE_CARD.splice(0,HAND);
  // console.log("SHUFFLE_CARD", SHUFFLE_CARD)


  







 
 //  CARD.innerHTML = ;
// img.setAttribute('src', 'images/praying-card_16.png');

// console.log("CARD[0]", CARD[0])

//   BUTTON[0].addEventListener('click',(e)=>{
//     e.preventDefault();
//     console.log('eureka');
//   })
  


  // BUTTON[0].addEventListener('click', (e) => {
  //   e.preventDefault();
  //   WINNING_RESULT.classList.add('active');

  //   // 入力数字を格納
  //   let inputNumbers = [];
  //   for (const i in INPUT_VALUE) {
  //     inputNumbers.push(Number(INPUT_VALUE[i].value));
  //   }

  //   // Set型で重複する数字を省く
  //   let inputNumbersFixed = new Set(inputNumbers.concat(numbers));

  //   // ボタンを押したらテキストエリアを無効化
  //   for (const iterator of VALUES) {
  //     iterator.disabled = true;
  //   }

  //   USER_NUMBER.innerHTML    = inputNumbers;
  //   WINNING_NUMBER.innerHTML = numbers;
  //   BONUS_NUMBER.innerHTML   = `${bonusNumber1},${bonusNumber2}`;

  //   if (inputNumbersFixed.size === COUNT) {
  //     RESULT[0].innerHTML = 'おめでとうございます！1等当選です！！';
  //   }
  //   else if (inputNumbersFixed.size === COUNT+1 && (inputNumbers.includes(bonusNumber1) || inputNumbers.includes(bonusNumber2))) {
  //     RESULT[0].innerHTML = '2等当選です！';
  //   }
  //   else if (inputNumbersFixed.size === COUNT+1) {
  //     RESULT[0].innerHTML = '3等当選です！';
  //   }
  //   else if (inputNumbersFixed.size === COUNT+2) {
  //     RESULT[0].innerHTML = '4等当選です！';
  //   }
  //   else if (inputNumbersFixed.size === COUNT+3) {
  //     RESULT[0].innerHTML = '5等当選です！';
  //   }
  //   else if (inputNumbersFixed.size === COUNT+4 && (inputNumbers.includes(bonusNumber1) || inputNumbers.includes(bonusNumber2))) {
  //     RESULT[0].innerHTML = '6等当選です！';
  //   }
  //   else {
  //     RESULT[0].innerHTML = '残念！ハズレです…';
  //   }
  // });