//短いプログラムで年齢をドロップダウンに表示する！
let age = document.getElementById('age-1');
for (let i = 10; i <= 60; i++) {
  age.innerHTML += `<option>${i}歳</option>`;
}

//メニューの内容をリストに表示する
let menu = document.getElementById('menu');
let list = {
  'home.html':'ホーム',
  'company.html':'会社情報',
  'product.html':'製品情報',
  'contact.html':'お問い合わせ'
};

for (var index in list) {
  menu.innerHTML += `<li><a href="${index}">${list[index]}</a></li>`;
}
//ボタンをクリックしたら確認ボックスを表示する①
document.getElementById('button-1').onclick = function(){
  if(confirm('閉じてよろしいでしょうか？')){
    window.close();
  }
}

//ボタンをクリックしたら確認ボックスを表示する②
document.getElementById('button-2').onclick = function(){
  if(confirm('閉じてよろしいでしょうか？')){
    window.close();
  }
  else{
    alert('閉じるのを中止しました');
  }
}

//選ばれた年齢によって割引率を変える
let age2 = document.getElementById('age-2');
age2.onchange = function(){
  let ageValue = age2.value;
  switch(ageValue){
    case'10':
     alert('10歳以下の方は半額です');
     break;
    case'30':
     alert('11-30歳の方は割引はありません');
     break;
    case'50':
     alert('31-50歳の方は10%割引です');
     break;
    case'51':
     alert('51歳以上の方は30%割引です');
     break;
  }
}

//今日のラッキーカラーをランダムに表示する
const colorArray = ['赤','青','黄色','緑','紫','黒','ピンク','茶色','灰色'];
const color      = ['red','blue','yellow','green','purple','black','pink','brown','gray'];
const value      = Math.floor(Math.random() * colorArray.length);
document.getElementById('lucky-color').innerHTML = `あなたの今日のラッキーカラーは<span style="color:${color[value]}">${colorArray[value]}</span>です`;


//ポケモンの数はいくつ？
const result  = document.getElementById('result');
const pokemon = document.querySelectorAll('.pokemon');

//変数は数値
let total = 0;

for (let i = 0; i < pokemon.length; i++) {
  total += parseInt(pokemon[i].innerHTML);
  result.innerHTML = total;
}

//入力したテキストを表示する
let input       = document.getElementById('input');
let inputbutton = document.getElementById('input-button');

inputbutton.addEventListener('click', function() {
  inputText = window.prompt('好きな言葉を入れてみて','');
  input.innerHTML = inputText;
  inputbutton.style.display = 'none';
},false);


//FizzBuzz
let startButton = document.getElementById('start-button');

function fizzBuzz(){
  for (let i = 1; i <= 100; i++) {
    if(i%3 === 0 && i%5 !== 0){
      console.log('Fizz');
    }else if(i%5 === 0 && i%3 !== 0){
      console.log('Buzz');
    }else if(i%5 === 0 && i%3 === 0){
      console.log('FizzBuzz');
    }else{
      console.log(i);
    }
  }
}

startButton.addEventListener('click', () => {
  fizzBuzz();
},false);


// 各項目部分をクリックされたら10人分のアカウント情報を表示
let userList = document.querySelectorAll('.list');

let data = {
  "平岡": {
    "id": "hdasdk",
    "password": "fdsdgsf"
  },
  "高橋": {
    "id": "sdad",
    "password": "fkgd:"
  },
  "金沢": {
    "id": "rtye@",
    "password": "dfgj"
  }
}

  for(let i = 0; i < 3; i++) {
    console.log(data);
  }

  console.table(data);

// function userListCheck(){
// }

// userListCheck();

