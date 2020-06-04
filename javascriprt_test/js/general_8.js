"use strict";

// 要素の準備
const PLAYER_CARDS = document.getElementsByClassName("porker__playing-card");
const PLAYER_CARD = Array.from(PLAYER_CARDS);
const ROLE_NAMES = document.getElementsByClassName("porker__role-name");
const ROLE_NAME = Array.from(ROLE_NAMES);
const BUTTON = document.getElementsByClassName("porker__start-button");
const RESULTS = document.getElementsByClassName("porker-game__result");
const RESULT = Array.from(RESULTS);
const HAND = 5;

// トランプの画像を格納
const CARD_ARRAY = [];
for (let i = 1; i <= 13; i++) {
  CARD_ARRAY.push(`club${i}`, `heart${i}`, `diamond${i}`, `spade${i}`);
}

// シャッフルしてカードをそれぞれ格納
// const SHUFFLE_CARD_ARRAY = CARD_ARRAY.sort(function () {
//   return Math.random() - 0.5;
// });
// const DEALER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0, HAND);
// const PLAYER_CARD_ARRAY = SHUFFLE_CARD_ARRAY.splice(0, HAND);

// デバッグ用　※最後に消す
const DEALER_CARD_ARRAY = ["club1", "diamond1", "heart11", "spade10", "club3"];
const PLAYER_CARD_ARRAY = [
  "diamond1",
  "diamond1",
  "club12",
  "club11",
  "diamond13",
];

const distributeHand = (array, element) => {
  for (const item of array) {
    element.insertAdjacentHTML("beforeend", `<img src=images/${item}.png>`);
  }
};
distributeHand(DEALER_CARD_ARRAY, PLAYER_CARD[0]);
distributeHand(PLAYER_CARD_ARRAY, PLAYER_CARD[1]);

const 配列を加工する = (array, element) => {
  // 文字列と数字を抜き出す
  const SUIT = [];
  const NUMERIC = [];
  for (const item of array) {
    SUIT.push(item.replace(/\d+/g, ""));
    NUMERIC.push(item.replace(/[^0-9]/g, ""));
  }

  // 配列に1が含まれる時は13に置換
  for (const [index, item] of NUMERIC.entries()) {
    if (item === "1") {
      NUMERIC.splice(index, 1, "14");
    }
  }

  // 重複を省いた配列をセット
  let setArrayNumeric = new Set(NUMERIC);
  let setArraySuit = new Set(SUIT);

  // 配列の中身の合計　※合計が高いほど強い
  let sum = 0;
  for (const item of NUMERIC) {
    sum += Number(item);
  }
  役名を判定する(setArraySuit, setArrayNumeric, sum, element, NUMERIC);
};

const 役名を判定する = (加工後配列1, 加工後配列2, 合計値, インプット, 配列) => {
  let characterName = "";
  if (加工後配列1.size === 1 && 合計値 === 60) {
    // 数字合計の最大値
    characterName = "ROYAL FLUSH";
  } else if (加工後配列1.size === 1 && 合計値 % 5 == 0) {
    characterName = "STRAIGHT FLUSH";
  } else if (加工後配列2.size === 2 || 加工後配列2.size === 3) {
    let counts = {};
    const DUPLICATE_NUMBER_ARRAY = [];
    for (const key of 配列) {
      counts[key] = counts[key] ? counts[key] + 1 : 1;
    }
    for (const key in counts) {
      DUPLICATE_NUMBER_ARRAY.push(counts[key]);
      DUPLICATE_NUMBER_ARRAY.sort((a, b) => {
        return a - b;
      });

      if (DUPLICATE_NUMBER_ARRAY.toString() === "1,4") {
        characterName = "FOUR OF A KIND";
      } else if (DUPLICATE_NUMBER_ARRAY.toString() === "2,3") {
        characterName = "A FULL HOUSE";
      } else if (DUPLICATE_NUMBER_ARRAY.toString() === "1,1,3") {
        characterName = "THREE OF A KIND";
      } else if (DUPLICATE_NUMBER_ARRAY.toString() === "1,2,2") {
        characterName = "TWO PAIR";
      }
    }
  } else if (加工後配列1.size === 1) {
    characterName = "FLUSH";
  } else if (加工後配列2.size === 5 && 合計値 % 5 == 0) {
    characterName = "STRAIGHT";
  } else if (加工後配列2.size === 4) {
    characterName = "A PAIR";
  } else {
    characterName = "HIGH CARD";
  }
  インプット.innerHTML = characterName;
  勝敗判定();
};

const 勝敗判定 = () => {
  const DEALER_CHARACTER_NAME = ROLE_NAME[0].textContent;
  const PLAYER_CHARACTER_NAME = ROLE_NAME[1].textContent;

  if (DEALER_CHARACTER_NAME === PLAYER_CHARACTER_NAME) {
    for (const element of RESULT) {
      element.innerHTML = "DRAW";
      element.classList.add("porker-game__result--draw");
    }
  }
};

配列を加工する(DEALER_CARD_ARRAY, ROLE_NAME[0]);
配列を加工する(PLAYER_CARD_ARRAY, ROLE_NAME[1]);

// BUTTON[0].addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("eureka");
// });
