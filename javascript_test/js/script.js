// Q1
let alertButton = document.getElementById('alert-button');

alertButton.onclick = function(){
  alert('保存しますか？');
}

// Q2
let confirmButton = document.getElementById('confirm-button');

confirmButton.onclick = function(){
  if(confirm('保存しますか？')){
    alert('保存しました');
  }else{
    alert('キャンセルしました');
  }
}

// Q3
let promptButton = document.getElementById('prompt-button');

promptButton.onclick = function(){
  if(prompt('東京オリンピックの開催年は？') === '2020年'){
    alert('正解！');
  }else{
    alert('違うよー');
  }
}