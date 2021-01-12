'use strict';

const PLAYER_CARDS = document.getElementsByClassName('porker__playing-card');
const PLAYER_CARD = Array.from(PLAYER_CARDS);
const ROLE_NAMES = document.getElementsByClassName('porker__role-name');
const ROLE_NAME = Array.from(ROLE_NAMES);
const BUTTONS = document.getElementsByClassName('porker__start-button');
const RESULTS = document.getElementsByClassName('porker-game__result');
const RESULT = Array.from(RESULTS);
const HAND = 5;

BUTTONS[0].addEventListener('click', (e) => {
  e.preventDefault();

  const initialize = (card) => {
    while (card.firstChild) card.removeChild(card.firstChild);
  };

  initialize(PLAYER_CARD[0]);
  initialize(PLAYER_CARD[1]);

  // トランプを格納
  const CARDS = [];
  for (let i = 1; i <= 13; i++) {
    CARDS.push(`club${i}`, `heart${i}`, `diamond${i}`, `spade${i}`);
  }

  // シャッフル
  const SHUFFLE_CARDS = CARDS.sort(() => {
    return Math.random() - 0.5;
  });
  const DEALER_CARDS = SHUFFLE_CARDS.splice(0, HAND);
  const PLAYER_CARDS = SHUFFLE_CARDS.splice(0, HAND);

  // 手札を配る
  const distribute = (array, element) => {
    for (const item of array) {
      element.insertAdjacentHTML('beforeend', `<img src=images/${item}.png>`);
    }
  };

  distribute(DEALER_CARDS, PLAYER_CARD[0]);
  distribute(PLAYER_CARDS, PLAYER_CARD[1]);

  class Player {
    constructor(cards) {
      this.cards = cards;
    }
    getNumbers() {
      const NUMBERS = [];
      for (const item of this.cards) {
        NUMBERS.push(Number(item.replace(/[^0-9]/g, '')));
      }

      // 配列に1が含まれる時は14に置換 ※合計値を算出する際に使用
      for (const [index, item] of NUMBERS.entries()) {
        if (item === 1) {
          NUMBERS.splice(index, 1, 14);
        }
      }
      return NUMBERS;
    }

    setNumbers() {
      const SET_NUMBERS = new Set(this.getNumbers());
      return SET_NUMBERS;
    }

    getMarks() {
      const MARKS = [];
      for (const item of this.cards) {
        MARKS.push(item.replace(/\d+/g, ''));
      }
      return MARKS;
    }

    setMarks() {
      const SET_MARKS = new Set(this.getMarks());
      return SET_MARKS;
    }

    total() {
      let total = 0;
      for (const item of this.getNumbers()) {
        total += Number(item);
      }
      return total;
    }

    getSequence() {
      let sequence = 0;
      const SORT = this.getNumbers().sort((a, b) => {
        return a - b;
      });
      for (let i = 0; i < SORT.length; i++) {
        if (Number(SORT[i] + 1 === SORT[i + 1])) {
          sequence++;
        }
      }
      return sequence;
    }
  }

  let dealer = new Player(DEALER_CARDS);
  let player = new Player(PLAYER_CARDS);
  let name = [];
  let rank = [];

  const determineHand = (numbers, setNumbers, setMarks, total, sequence) => {
    let characterName = '';
    let characterRank = '';

    // 60は10,J,Q,K,Aの合計値
    if (setMarks.size === 1 && total === 60) {
      characterName = 'ROYAL FLUSH';
      characterRank = 10;
    } else if (setMarks.size === 1 && sequence === 4) {
      characterName = 'STRAIGHT FLUSH';
      characterRank = 9;
    } else if (setMarks.size === 1) {
      characterName = 'FLUSH';
      characterRank = 6;
    } else if (setMarks.size > 1 && sequence === 4) {
      characterName = 'STRAIGHT';
      characterRank = 5;
    } else if (setNumbers.size === 2 || setNumbers.size === 3) {
      let pear_counts = {};
      const DUPLICATE_NUMBER_ARRAY = [];
      for (const key of numbers) {
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
    } else if (setNumbers.size === 4) {
      characterName = 'A PAIR';
      characterRank = 2;
    } else {
      characterName = 'HIGH CARD';
      characterRank = 1;
    }
    name.push(characterName);
    rank.push(characterRank);
  };

  determineHand(dealer.getNumbers(), dealer.setNumbers(), dealer.setMarks(), dealer.total(), dealer.getSequence());
  determineHand(player.getNumbers(), player.setNumbers(), player.setMarks(), player.total(), player.getSequence());

  // カードの強さで判定　※ハイカードのみ
  const equalsMaximumValue = (array1, array2, characterName) => {
    const DEARER_MAXIMUM = Math.max.apply(null, array1);
    const PLAYER_MAXIMUM = Math.max.apply(null, array2);

    if (DEARER_MAXIMUM > PLAYER_MAXIMUM) {
      input('win', 'lose', characterName[0], characterName[1]);
    } else if (DEARER_MAXIMUM < PLAYER_MAXIMUM) {
      input('lose', 'win', characterName[0], characterName[1]);
    } else if (DEARER_MAXIMUM === PLAYER_MAXIMUM) {
      const DEARER_MAXIMUM_INDEX = array1.indexOf(DEARER_MAXIMUM);
      const PLAYER_MAXIMUM_INDEX = array2.indexOf(PLAYER_MAXIMUM);
      array1.splice(DEARER_MAXIMUM_INDEX, 1);
      array2.splice(PLAYER_MAXIMUM_INDEX, 1);
      equalsMaximumValue(array1, array2, characterName);
    }
  };

  // 判定結果を出力
  const input = (dealerResult, playerResult, dealerCharacter, playerCharacter) => {
    ROLE_NAME[0].innerHTML = dealerCharacter.toUpperCase();
    ROLE_NAME[1].innerHTML = playerCharacter.toUpperCase();
    RESULT[0].innerHTML = dealerResult.toUpperCase();
    RESULT[1].innerHTML = playerResult.toUpperCase();
    RESULT[0].classList = `porker-game__result--${dealerResult}`;
    RESULT[1].classList = `porker-game__result--${playerResult}`;
  };

  // 役名の強さで判定
  const determineResult = (characterName, characterRank) => {
    const DEALER_RANK = characterRank[0];
    const PLAYER_RANK = characterRank[1];

    if (DEALER_RANK === 1 && PLAYER_RANK === 1) {
      equalsMaximumValue(dealer.getNumbers(), player.getNumbers(), characterName);
    } else if (DEALER_RANK === PLAYER_RANK) {
      input('draw', 'draw', characterName[0], characterName[1]);
    } else if (DEALER_RANK > PLAYER_RANK) {
      input('win', 'lose', characterName[0], characterName[1]);
    } else if (DEALER_RANK < PLAYER_RANK) {
      input('lose', 'win', characterName[0], characterName[1]);
    }
  };
  determineResult(name, rank);
});
