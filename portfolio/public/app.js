document.addEventListener('DOMContentLoaded', function() {
  const $input = document.querySelector('#input')
  const $output = document.querySelector('#output')
  const db = firebase.database() // データベースへの参照を得る
  const messageRef = db.ref('/message') // '/message'への参照を作成する

  $input.addEventListener('input', function(e) {
    var target = e.target
    messageRef.set(target.value) // .set() を使ってデータを書き込む
  })

  messageRef.on('value', function(snapshot) {
    $output.textContent = snapshot.val()
  })
})