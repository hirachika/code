  //要素の準備
  var user             = document.getElementById('user');
      password         = document.getElementById('password');
      passwordConfirm  = document.getElementById('passwordConfirm');
      mail1            = document.getElementById('mail1');
      mail2            = document.getElementById('mail2');
      tel1             = document.getElementById('tel1');
      tel2             = document.getElementById('tel2');
      tel3             = document.getElementById('tel3');
      button           = document.getElementById('button');
      error            = document.getElementById('error');

  //要素の作成
  var p = document.createElement('p');
  button.disabled = 'disabled';

  //エラー時の処理
  function add(elem,comment){
    elem.parentNode.appendChild(p);
    p.classList.add('error');
    p.textContent = comment;
    button.disabled = "disabled";
  }

  //フォーカスが外れたら入力チェック
  user.addEventListener('blur',function(){
      if( this.value.match(/[^a-zA-Z0-9]/)){
        add(this,'6文字以上32文字以内の半角英数で入力してください。');
      }
      else{
        button.disabled = '';
        p.textContent   = '';          
      }
    },false);

  password.addEventListener('blur',function(){
    var value = this.value;
      if( 8 > value.length || value.match(/[^a-zA-Z0-9]/)){
        add(this,'8文字以上の半角英数で入力してください。');
      }
      else{
        button.disabled = '';
        p.textContent   = '';          
      }
    },false);

  passwordConfirm.addEventListener('blur',function(){
    var value = this.value;
      if( value !== password.value ){
        add(this,'入力したパスワードと一致していません。');
      }
      else{
        button.disabled = '';
        p.textContent   = '';          
      }
    },false);

  function mailcheck(elem){
    elem.addEventListener('blur',function(){
      var value = this.value;
        if(value.match(/[^a-zA-Z0-9_.-]/) || value === ''){
          add(this,'半角英数で入力してください。');
        }
        else{
          button.disabled = '';
          p.textContent   = '';          
        }
    },false);
  }

  function telcheck(elem){
    elem.addEventListener('blur',function(){
      var value = this.value;
        if(value.match(/[^0-9]/) || value === '' || value.length > 4){
          add(this,'4桁未満の半角数字で入力してください。');
        }
        else{
          button.disabled = '';
          p.textContent   = '';          
        }
    },false); 
  }

  mailcheck(mail1);
  mailcheck(mail2);
  telcheck(tel1);
  telcheck(tel2);
  telcheck(tel3);