'use strict';

const DEALER_WIN_RATE = document.getElementsByClassName('win-rate__denominator');
const PLAYER_WIN = document.querySelector('.porker-game__player-win');
const PLAYER_LOSE = document.querySelector('.porker-game__player-lose');
const PLAYER_DRAW = document.querySelector('.porker-game__player-draw');
const PLAYER_CARDS = document.getElementsByClassName('porker__playing-card');
const PLAYER_CARD = Array.from(PLAYER_CARDS);
const ROLE_NAMES = document.getElementsByClassName('porker__role-name');
const ROLE_NAME = Array.from(ROLE_NAMES);
const BUTTONS = document.getElementsByClassName('porker__start-button');
const RESULTS = document.getElementsByClassName('porker-game__result');
const RESULT = Array.from(RESULTS);
const HAND = 5;
const CARD_RANK = 13;

// ゲームセット回数
let game_count = 0;
let game_set = 0;
let dealerWinCount = 0;
let playerWinCount = 0;
let playerDrawCount = 0;
let playerLoseCount = 0;

// 親の勝率設定 ※検証用
const WIN_RATE = 5;
DEALER_WIN_RATE[0].innerHTML = WIN_RATE;

BUTTONS[0].addEventListener('click', (e) => {
  e.preventDefault();
  // ゲーム回数
  game_count++;

  // ゲームセット
  game_set++;
  console.log('game_set', game_set);
  if (game_set % WIN_RATE == 0) {
    // 5回に1回リセットする
    game_set = 0;
  }

  // ゲームの初期化
  const initialize = (playerCards) => {
    for (const item of playerCards) {
      while (item.firstChild) item.removeChild(item.firstChild);
    }
  };
  initialize(PLAYER_CARD);

  // カードをシャッフルして格納
  let dealerCards;
  let playerCards;

  const gameStart = () => {
    const CARDS = [];
    for (let i = 1; i <= CARD_RANK; i++) {
      CARDS.push(`club${i}`, `heart${i}`, `diamond${i}`, `spade${i}`);
    }
    const SHUFFLE_CARDS = CARDS.sort(() => {
      return Math.random() - 0.5;
    });
    dealerCards = SHUFFLE_CARDS.splice(0, HAND);
    playerCards = SHUFFLE_CARDS.splice(0, HAND);

    // プレイヤーカードを判定用に加工
    class Card {
      constructor(cards) {
        this.cards = cards;
      }
      getNumbers() {
        const NUMBERS = [];
        for (const item of this.cards) {
          NUMBERS.push(Number(item.replace(/[^0-9]/g, '')));
        }

        // 配列に1が含まれる時は14に置換 ※合計値と連番確認の際に使用
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

    const DEALER = new Card(dealerCards);
    const PLAYER = new Card(playerCards);

    // 役名を判定する
    let role = [];
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
      role.push(characterName);
      rank.push(characterRank);
    };

    determineHand(DEALER.getNumbers(), DEALER.setNumbers(), DEALER.setMarks(), DEALER.total(), DEALER.getSequence());
    determineHand(PLAYER.getNumbers(), PLAYER.setNumbers(), PLAYER.setMarks(), PLAYER.total(), PLAYER.getSequence());

    // 役名とランクを格納
    const DEALER_ROLE = role[0];
    const PLAYER_ROLE = role[1];
    const DEALER_RANK = rank[0];
    const PLAYER_RANK = rank[1];

    // 手札を配る
    const distribute = (array, element) => {
      for (const item of array) {
        element.insertAdjacentHTML('beforeend', `<img src=images/${item}.png>`);
      }
    };

    // 出力（子が勝ったら出力）
    const result = (dealerResult, playerResult) => {
      if (playerResult === 'win') {
        playerWinCount++;
      } else if (playerWinCount <= 4) {
        gameStart();
      }
      PLAYER_WIN.innerHTML = playerWinCount;
      PLAYER_LOSE.innerHTML = game_count - (playerWinCount + playerDrawCount);
      PLAYER_DRAW.innerHTML = playerDrawCount;
    };

    // const input = (dealerResult, playerResult) => {
    //   ROLE_NAME[0].innerHTML = DEALER_ROLE.toUpperCase();
    //   ROLE_NAME[1].innerHTML = PLAYER_ROLE.toUpperCase();
    //   RESULT[0].innerHTML = dealerResult.toUpperCase();
    //   RESULT[1].innerHTML = playerResult.toUpperCase();
    //   RESULT[0].classList = `porker-game__result--${dealerResult}`;
    //   RESULT[1].classList = `porker-game__result--${playerResult}`;
    //   PLAYER_WIN.innerHTML = playerWin;
    //   PLAYER_LOSE.innerHTML = dealerWin;
    //   distribute(dealerCards, PLAYER_CARD[0]);
    //   distribute(playerCards, PLAYER_CARD[1]);
    // };

    // ハイカードの時それぞれの手札の強さで勝敗判定
    const equalsMaximumValue = (array1, array2) => {
      const DEARER_MAXIMUM = Math.max.apply(null, array1);
      const PLAYER_MAXIMUM = Math.max.apply(null, array2);

      if (DEARER_MAXIMUM > PLAYER_MAXIMUM) {
        result('win', 'lose');
      } else if (DEARER_MAXIMUM < PLAYER_MAXIMUM) {
        result('lose', 'win');
      } else if (DEARER_MAXIMUM === PLAYER_MAXIMUM) {
        const DEARER_MAXIMUM_INDEX = array1.indexOf(DEARER_MAXIMUM);
        const PLAYER_MAXIMUM_INDEX = array2.indexOf(PLAYER_MAXIMUM);
        array1.splice(DEARER_MAXIMUM_INDEX, 1);
        array2.splice(PLAYER_MAXIMUM_INDEX, 1);
        equalsMaximumValue(array1, array2);
      }
    };

    // 役名の強さで勝敗判定
    const determineResult = (dealerRank, playerRank) => {
      // ハイカード
      if (dealerRank === 1 && playerRank === 1) {
        equalsMaximumValue(DEALER.getNumbers(), PLAYER.getNumbers());
      } else if (dealerRank === playerRank) {
        result('draw', 'draw');
      } else if (dealerRank > playerRank) {
        result('win', 'lose');
      } else if (dealerRank < playerRank) {
        result('lose', 'win');
      }
    };
    determineResult(DEALER_RANK, PLAYER_RANK);
  };
  gameStart();
});
