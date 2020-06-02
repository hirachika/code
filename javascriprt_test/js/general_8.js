'use strict';

  // 初期設定
  const DEALER_CARD = document.getElementsByClassName('porker__playing-card--dealer');
  const PLAYER_CARD = document.getElementsByClassName('porker__playing-card--player');
  const BUTTON      = document.getElementsByClassName('porker__start-button');
  const RESULT      = document.getElementsByClassName('porker-game__result');
  const ROLE_NAME   = document.getElementsByClassName('porker__role-name');
  const HAND        = 5;

  // トランプの画像を格納
  const CARD_ARRAY = [];
  for (let i = 1; i <= 13; i++) {
    CARD_ARRAY.push(`club_${i}`,`heart_${i}`,`diamond_${i}`,`spade_${i}`);
  }
  
  // シャッフルしてカードをそれぞれ格納
  const SHUFFLE_CARD_ARRAY = CARD_ARRAY.sort(function(){ return Math.random() - 0.5});
  const DEALER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0,HAND);
  const PLAYER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0,HAND);

  const distributeCard = (array,element) => {
    for (const item of array) {
      element.insertAdjacentHTML('beforeend',`<img src=images/${item}.png>`);
    }
  }

  distributeCard(DEALER_CARD_ARRAY,DEALER_CARD[0]);
  distributeCard(PLAYER_CARD_ARRAY,PLAYER_CARD[0]);

  for (const item of DEALER_CARD_ARRAY) {
    console.log(item);
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