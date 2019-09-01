function mySort(name,arrey){
  let list = {
    'ピチュー':-1,
    'ピカチュウ':0,
    'ライチュウ':1
  }
  arrey.sort(function(a,b){
    return list[a] - list[b];
  });
  if(name === 'negative'){
    arrey.reverse();
  }
  return arrey;
}

var feelings = ['ピカチュウ', 'ライチュウ', 'ピチュー'];

// ポジティブな順で並び替える
console.log(mySort('positive', feelings));
// ['good', 'good', 'nothing', 'nothing', 'bad', 'bad']

// ネガティブな順で並び替える
console.log(mySort('negative', feelings));
// ['bad', 'bad', 'nothing', 'nothing', 'good', 'good']

