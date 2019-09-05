//短いプログラムで年齢をドロップダウンに表示する！
let age = document.getElementById('age-1');
for (var i = 10; i <= 50; i++) {
  age.innerHTML += `<option value="${i}">${i}歳</option>`;
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
