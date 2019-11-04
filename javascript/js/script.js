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
let extensionName = document.getElementById('extension-name');
let row           = document.getElementById('row');

var data = [
  {
    "name": "QRコード",
    "url": "https://chrome.google.com/webstore/detail/the-qr-code-extension/oijdcdmnjjgnnhgljmhkjlablaejfeeb"
  },
  {
    "name": "マルチハイライト",
    "url": "https://chrome.google.com/webstore/detail/multi-highlight/pfgfgjlejbbpfmcfjhdmikihihddeeji"
  },
  {
    "name": "Pasty",
    "url": "https://chrome.google.com/webstore/detail/pasty/hdjihnnclpjhfdbbinmgoiehhoehhlgf"
  },
  {
    "name": "Window Resizer",
    "url": "https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh"
  },
  {
    "name": "OneTab",
    "url": "https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall"
  },
  {
    "name": "Image Downloader",
    "url": "https://chrome.google.com/webstore/detail/image-downloader/cnpniohnfphhjihaiiggeabnkjhpaldj"
  },
  {
    "name": "Alt & Meta viewer",
    "url": "https://chrome.google.com/webstore/detail/alt-meta-viewer/jjcjblcbnjhgjlnclhficglfjedhpjhl"
  },
  {
    "name": "HTMLエラーチェッカー",
    "url": "https://chrome.google.com/webstore/detail/html%E3%82%A8%E3%83%A9%E3%83%BC%E3%83%81%E3%82%A7%E3%83%83%E3%82%AB%E3%83%BC/ohdllebchmmponnofchalfkegpjojcaf?hl=ja"
  },
  {
    "name": "Awesome Screenshot",
    "url": "https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj"
  },
  {
    "name": "FireShot",
    "url": "https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg"
  },
  {
    "name": "Check My Links",
    "url": "https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf"
  },
  {
    "name": "Open Graph Preview",
    "url": "https://chrome.google.com/webstore/detail/open-graph-preview/ehaigphokkgebnmdiicabhjhddkaekgh"
  },
  {
    "name": "Linkclump",
    "url": "https://chrome.google.com/webstore/detail/linkclump/lfpjkncokllnfokkgpkobnkbkmelfefj"
  },
  {
    "name": "Linkify JIRA Issues",
    "url": "https://chrome.google.com/webstore/detail/linkify-jira-issues/ekbbnaokafbanjgmcbllligemhiclbcb"
  },
  {
    "name": "pixel perfect",
    "url": "https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi"
  },
  {
    "name": "かんたん文字数カウント",
    "url": "https://chrome.google.com/webstore/detail/%E3%81%8B%E3%82%93%E3%81%9F%E3%82%93%E6%96%87%E5%AD%97%E6%95%B0%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88/lmmephjlhfdnijfigajbmemendbfhnha?hl=ja"
  },
  {
    "name": "アプリ",
    "url": "url（mac）"
  },
  {
    "name": "dash",
    "url": "https://kapeli.com/dash"
  },
  {
    "name": "skitch",
    "url": "https://apps.apple.com/jp/app/skitch-%E6%92%AE%E3%82%8B-%E6%8F%8F%E3%81%8D%E8%BE%BC%E3%82%80-%E5%85%B1%E6%9C%89%E3%81%99%E3%82%8B/id425955336?mt=12"
  },
  {
    "name": "sublime",
    "url": "https://www.sublimetext.com/3"
  },
  {
    "name": "WinArchiver Lite",
    "url": "https://www.sublimetext.com/3"
  },
  {
    "name": "prepros",
    "url": "https://prepros.io/"
  },
  {
    "name": "Gazo",
    "url": "https://gyazo.com/captures"
  }
];

for(let i = 0; i < data.length; i++) {
  row.insertAdjacentHTML('afterend',`<tr><td><a href="${data[i].url}">${data[i].name}</a></td></tr>`);
}