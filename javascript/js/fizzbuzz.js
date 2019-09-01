// 練習問題1
// function fizzBuzz(num){
//   if(num % 3 === 0){
//     return 'Fizz';
//   }
//   if(num % 5 === 0){
//     return 'Buzz';
//   }
//   else{
//     return num;
//   }
// };

// for (var i = 1; i < 100; i++) {
//   console.log(fizzBuzz(i));
// }

// 練習問題2
// var list  = ['Fi','Bu','zz','FizzBuzz'];
// var count = 0;

// function FizzBuzz(arr){
//   while(count < 10){
//     var random = arr[Math.floor(Math.random() * arr.length)];
//     count++;
//     if(random === 'FizzBuzz'){
//       continue;
//     }
//     console.log(random);
//   }
// }

// FizzBuzz(list);

// 練習問題3
// 'use script';

// function dayToSec(d){
//   var days = Math.floor(d * (60*60*24));
//   console.log(days);
// }

// dayToSec(1);
// dayToSec(3);
// dayToSec(5);

const cat = () => {
  console.log('にゃー');
};

const animal = (animalName) => {
  animalName();
};

animal(cat);
