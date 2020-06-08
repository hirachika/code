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

  class Player {
    constructor(array) {
      this.array = array;
    }
    makeNumericArray() {
      const NUMERIC_ARRAY = [];
      for (const item of this.array) {
        NUMERIC_ARRAY.push(Number(item.replace(/[^0-9]/g, '')));
      }

      // 配列に1が含まれる時は14に置換 ※合計値を算出する際に使用
      for (const [index, item] of NUMERIC_ARRAY.entries()) {
        if (item === 1) {
          NUMERIC_ARRAY.splice(index, 1, 14);
        }
      }
      return NUMERIC_ARRAY;
    }

    setArrayNumeric() {
      const suitArray = new Set(this.makeNumericArray());
      return suitArray;
    }

    makeSuitArray() {
      const SUIT_ARRAY = [];
      for (const item of this.array) {
        SUIT_ARRAY.push(item.replace(/\d+/g, ''));
      }
      return SUIT_ARRAY;
    }

    setArraySuit() {
      const setArray = new Set(this.makeSuitArray());
      return setArray;
    }

    sum() {
      let sum = 0;
      for (const item of this.makeNumericArray()) {
        sum += Number(item);
      }
      return sum;
    }

    countSequence() {
      let sequenceCounts = 0;
      const SORT_ARRAY = this.makeNumericArray().sort((a, b) => {
        return a - b;
      });
      for (let i = 0; i < SORT_ARRAY.length; i++) {
        if (Number(SORT_ARRAY[i] + 1 === SORT_ARRAY[i + 1])) {
          sequenceCounts++;
        }
      }
      return sequenceCounts;
    }
  }

  let dealer = new Player(DEALER_CARD_ARRAY);
  let player = new Player(PLAYER_CARD_ARRAY);

  const determineHand = (numericArray, setNumericArray, setSuitArray, totalValue, sequenceCounts, input) => {
    let characterName = '';
    let characterRank = '';

    // 60は10,J,Q,K,Aの合計値
    if (setSuitArray.size === 1 && totalValue === 60) {
      characterName = 'ROYAL FLUSH';
      characterRank = 10;
    } else if (setSuitArray.size === 1 && sequenceCounts === 4) {
      characterName = 'STRAIGHT FLUSH';
      characterRank = 9;
    } else if (setSuitArray.size === 1) {
      characterName = 'FLUSH';
      characterRank = 6;
    } else if (setSuitArray.size > 1 && sequenceCounts === 4) {
      characterName = 'STRAIGHT';
      characterRank = 5;
    } else if (setNumericArray.size === 2 || setNumericArray.size === 3) {
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
    } else if (setNumericArray.size === 4) {
      characterName = 'A PAIR';
      characterRank = 2;
    } else {
      characterName = 'HIGH CARD';
      characterRank = 1;
    }
    input.innerHTML = characterName;
    input.dataset.rank = characterRank;
  };

  determineHand(
    dealer.makeNumericArray(),
    dealer.setArrayNumeric(),
    dealer.setArraySuit(),
    dealer.sum(),
    dealer.countSequence(),
    ROLE_NAME[0]
  );

  determineHand(
    player.makeNumericArray(),
    player.setArrayNumeric(),
    player.setArraySuit(),
    player.sum(),
    player.countSequence(),
    ROLE_NAME[1]
  );

  const maximumValue = (array1, array2) => {
    const DEARER_MAX_NUMBER = Math.max.apply(null, array1);
    const PLAYER_MAX_NUMBER = Math.max.apply(null, array2);

    if (DEARER_MAX_NUMBER > PLAYER_MAX_NUMBER) {
      RESULT[0].innerHTML = 'WIN';
      RESULT[0].classList = 'porker-game__result--win';
      RESULT[1].innerHTML = 'LOSE';
      RESULT[1].classList = 'porker-game__result--lose';
    } else if (DEARER_MAX_NUMBER < PLAYER_MAX_NUMBER) {
      RESULT[0].innerHTML = 'LOSE';
      RESULT[0].classList = 'porker-game__result--lose';
      RESULT[1].innerHTML = 'WIN';
      RESULT[1].classList = 'porker-game__result--win';
    } else if (DEARER_MAX_NUMBER === PLAYER_MAX_NUMBER) {
      const DEARER_MAX_NUMBER_INDEX = array1.indexOf(DEARER_MAX_NUMBER);
      const PLAYER_MAX_NUMBER_INDEX = array2.indexOf(PLAYER_MAX_NUMBER);
      array1.splice(DEARER_MAX_NUMBER_INDEX, 1);
      array2.splice(PLAYER_MAX_NUMBER_INDEX, 1);
      maximumValue(array1, array2);
    }
  };

  const isWinner = (name) => {
    for (let i = 0; i < name.length; i++) {
      const DEALER_RANK = Number(name[0].dataset.rank);
      const PLAYER_RANK = Number(name[1].dataset.rank);

      if (DEALER_RANK === 1 && PLAYER_RANK === 1) {
        maximumValue(dealer.makeNumericArray(), player.makeNumericArray());
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
