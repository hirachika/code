'use strict';

const PLAYER_CARDS = document.getElementsByClassName('porker__playing-card');
const PLAYER_CARD = Array.from(PLAYER_CARDS);
const ROLE_NAMES = document.getElementsByClassName('porker__role-name');
const ROLE_NAME = Array.from(ROLE_NAMES);
const BUTTON = document.getElementsByClassName('porker__start-button');
const RESULTS = document.getElementsByClassName('porker-game__result');
const RESULT = Array.from(RESULTS);
const HAND = 5;

BUTTON[0].addEventListener('click', (e) => {
  e.preventDefault();

  const isInitialize = (card, className) => {
    while (card.firstChild) card.removeChild(card.firstChild);
    className.classList;
  };

  isInitialize(PLAYER_CARD[0], RESULT[0]);
  isInitialize(PLAYER_CARD[1], RESULT[0]);

  // トランプを格納
  const CARD_ARRAY = [];
  for (let i = 1; i <= 13; i++) {
    CARD_ARRAY.push(`club${i}`, `heart${i}`, `diamond${i}`, `spade${i}`);
  }

  // シャッフルして手札を配る
  const SHUFFLE_CARD_ARRAY = CARD_ARRAY.sort(function () {
    return Math.random() - 0.5;
  });
  const DEALER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0, HAND);
  const PLAYER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0, HAND);

  const distributeHand = (array, element) => {
    for (const item of array) {
      element.insertAdjacentHTML('beforeend', `<img src=images/${item}.png>`);
    }
  };

  distributeHand(DEALER_CARD_ARRAY, PLAYER_CARD[0]);
  distributeHand(PLAYER_CARD_ARRAY, PLAYER_CARD[1]);

  const processArray = (array, element) => {
    // 文字列と数字を抜き出す
    const SUIT_ARRAY = [];
    const NUMERIC_ARRAY = [];
    for (const item of array) {
      SUIT_ARRAY.push(item.replace(/\d+/g, ''));
      NUMERIC_ARRAY.push(Number(item.replace(/[^0-9]/g, '')));
    }

    // 配列に1が含まれる時は14に置換 ※合計値を算出する際に使用
    for (const [index, item] of NUMERIC_ARRAY.entries()) {
      if (item === 1) {
        NUMERIC_ARRAY.splice(index, 1, 14);
      }
    }

    let sum = 0;
    for (const item of NUMERIC_ARRAY) {
      sum += Number(item);
    }
    determineHand(NUMERIC_ARRAY, SUIT_ARRAY, sum, element);
  };

  const determineHand = (numericArray, suitArray, totalValue, input) => {
    const SET_ARRAY_NUMERIC = new Set(numericArray);
    const SET_ARRAY_SUIT = new Set(suitArray);

    let characterName = '';
    let characterRank = '';
    let sequence_counts = 0;

    // 連続している数字を判定
    numericArray.sort((a, b) => {
      return a - b;
    });
    for (let i = 0; i < numericArray.length; i++) {
      if (Number(numericArray[i] + 1 === numericArray[i + 1])) {
        sequence_counts++;
      }
    }

    if (SET_ARRAY_SUIT.size === 1 && totalValue === 60) {
      characterName = 'ROYAL FLUSH';
      characterRank = 10;
    } else if (SET_ARRAY_SUIT.size === 1 && sequence_counts === 4) {
      characterName = 'STRAIGHT FLUSH';
      characterRank = 9;
    } else if (SET_ARRAY_SUIT.size === 1) {
      characterName = 'FLUSH';
      characterRank = 6;
    } else if (sequence_counts === 4 && sequence_counts === 4) {
      characterName = 'STRAIGHT';
      characterRank = 9;
    } else if (SET_ARRAY_NUMERIC.size === 2 || SET_ARRAY_NUMERIC.size === 3) {
      let pear_counts = {};
      const DUPLICATE_NUMBER_ARRAY = [];
      for (const key of numericArray) {
        pear_counts[key] = pear_counts[key] ? pear_counts[key] + 1 : 1;
      }
      for (const key in pear_counts) {
        DUPLICATE_NUMBER_ARRAY.push(pear_counts[key]);
        DUPLICATE_NUMBER_ARRAY.sort((a, b) => {
          return a - b;
        });

        if (DUPLICATE_NUMBER_ARRAY.toString() === '1,4') {
          characterName = 'FOUR OF A KIND';
          characterRank = 8;
        } else if (DUPLICATE_NUMBER_ARRAY.toString() === '2,3') {
          characterName = 'A FULL HOUSE';
          characterRank = 7;
        } else if (DUPLICATE_NUMBER_ARRAY.toString() === '1,1,3') {
          characterName = 'THREE OF A KIND';
          characterRank = 4;
        } else if (DUPLICATE_NUMBER_ARRAY.toString() === '1,2,2') {
          characterName = 'TWO PAIR';
          characterRank = 3;
        }
      }
    } else if (SET_ARRAY_NUMERIC.size === 4) {
      characterName = 'A PAIR';
      characterRank = 2;
    } else {
      characterName = 'HIGH CARD';
      characterRank = 1;
    }

    input.innerHTML = characterName;
    input.dataset.rank = characterRank;
    input.dataset.sum = totalValue;
  };

  processArray(DEALER_CARD_ARRAY, ROLE_NAME[0]);
  processArray(PLAYER_CARD_ARRAY, ROLE_NAME[1]);

  const isWinner = (name) => {
    const DEALER_SUM = Number(name[0].dataset.sum);
    const PLAYER_SUM = Number(name[1].dataset.sum);
    for (let i = 0; i < name.length; i++) {
      const DEALER_RANK = Number(name[0].dataset.rank);
      const PLAYER_RANK = Number(name[1].dataset.rank);

      if (DEALER_RANK === 1 && PLAYER_RANK === 1 && DEALER_SUM > PLAYER_SUM) {
        RESULT[0].innerHTML = 'WIN';
        RESULT[0].classList = 'porker-game__result--win';
        RESULT[1].innerHTML = 'LOSE';
        RESULT[1].classList = 'porker-game__result--lose';
      } else if (DEALER_RANK === 1 && PLAYER_RANK === 1 && DEALER_SUM < PLAYER_SUM) {
        RESULT[0].innerHTML = 'LOSE';
        RESULT[0].classList = 'porker-game__result--lose';
        RESULT[1].innerHTML = 'WIN';
        RESULT[1].classList = 'porker-game__result--win';
      } else if (DEALER_RANK === PLAYER_RANK) {
        RESULT[i].innerHTML = 'DRAW';
        RESULT[i].classList = 'porker-game__result--draw';
      } else if (DEALER_RANK < PLAYER_RANK) {
        RESULT[0].innerHTML = 'LOSE';
        RESULT[0].classList = 'porker-game__result--lose';
        RESULT[1].innerHTML = 'WIN';
        RESULT[1].classList = 'porker-game__result--win';
      } else if (DEALER_RANK > PLAYER_RANK) {
        RESULT[0].innerHTML = 'WIN';
        RESULT[0].classList = 'porker-game__result--win';
        RESULT[1].innerHTML = 'LOSE';
        RESULT[1].classList = 'porker-game__result--lose';
      }
    }
  };
  isWinner(ROLE_NAME);
});
