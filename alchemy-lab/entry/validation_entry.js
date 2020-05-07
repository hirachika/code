var userName=document.getElementById("name"); 
var userFurigana=document.getElementById("furigana"); 
var userBirthday=document.getElementById("birthday"); 
var userFurigana=document.getElementById("furigana"); 
var userZipcode=document.getElementById("zipcode");
var userAddress=document.getElementById("address");
var userMail=document.getElementById("mail"); 
var userConfirmMail=document.getElementById("confirm_mail"); 
var userTel=document.getElementById("tel"); 
var userPrivacyPolicy=document.getElementById("privacy_policy");

var errorName=document.getElementById("error_name"); 
var errorFurigana=document.getElementById("error_furigana"); 
var errorBirthday=document.getElementById("error_birthday"); 
var errorFurigana=document.getElementById("error_furigana"); 
var errorZipcode=document.getElementById("error_zipcode");
var errorAddress=document.getElementById("error_address");
var errorMail=document.getElementById("error_mail"); 
var errorConfirmMail=document.getElementById("error_confirm_mail"); 
var errorTel=document.getElementById("error_tel"); 
var errorPrivacyPolicy=document.getElementById("error_privacy_policy");

var confirmButton = document.getElementById("confirm_button");
confirmButton.disabled = true; //初期状態ではボタンを押せない

var returnValues;
var err_flag = 0;

var errorMessageName = "";
var errorMessageFurigana = "";
var errorMessageBirthday = "";
var errorMessageFurigana = "";
var errorMessageZipcode = "";
var errorMessageAddress = "";
var errorMessageMail = "";
var errorMessageConfirmMail = "";
var errorMessageTel = "";
var errorMessagePrivacyPolicy = "";

userName.addEventListener("blur",function(e){
  check();
},false);
userFurigana.addEventListener("blur",function(e){
  check();
},false);
userBirthday.addEventListener("blur",function(e){
  check();
},false);
userFurigana.addEventListener("blur",function(e){
  check();
},false);
userZipcode.addEventListener("blur",function(e){
  check();
},false);
userAddress.addEventListener("blur",function(e){
  check();
},false);
userMail.addEventListener("blur",function(e){
  check();
},false);
userConfirmMail.addEventListener("blur",function(e){
  check();
},false);
userTel.addEventListener("blur",function(e){
  check();
},false);
userPrivacyPolicy.addEventListener("change",function(e){
  check();
},false);

    errorMessagePrivacyPolicy = '<p>個人情報保護方針に同意していません</p>';
    errorPrivacyPolicy.innerHTML= errorMessagePrivacyPolicy;
    ++err_flag;
  console.log(err_flag);
function check(){
  err_flag = 0;
  console.log(err_flag);
  var userNameValue=document.getElementById("name").value; 
  var userFuriganaValue=document.getElementById("furigana").value; 
  var userBirthdayValue=document.getElementById("birthday").value; 
  var userFuriganaValue=document.getElementById("furigana").value; 
  var userZipcodeValue=document.getElementById("zipcode").value; 
  var userAddressValue=document.getElementById("address").value; 
  var userMailValue=document.getElementById("mail").value; 
  var userConfirmMailValue=document.getElementById("confirm_mail").value; 
  var userTelValue=document.getElementById("tel").value; 
  //var userPrivacyPolicyValue=document.getElementById("privacy_policy").value; 
  var form = document.forms.entry; 
  var userPrivacyPolicyValue=form.privacy_policy.checked
  
  //名前入力チェック
  if( userNameValue !== "" && userNameValue.match(/^.{2,32}$/) ){
    errorName.innerHTML=" ";
  }else{
    errorMessageName = '<p>無効な入力です</p>';
    errorName.innerHTML= errorMessageName;
    ++err_flag;
  };

  //フリガナ入力チェック
  if( userFuriganaValue !== "" && userFuriganaValue.match(/^.{2,32}$/) ){
    errorFurigana.innerHTML=" ";
  }else{
    errorMessageFurigana = '<p>無効な入力です</p>';
    errorFurigana.innerHTML= errorMessageFurigana;
    ++err_flag;
  };


  //生年月入力チェック
  if( userBirthdayValue !== "" && userBirthdayValue.match(/^.{10,24}$/) ){
    errorBirthday.innerHTML=" ";
  }else{
    errorMessageBirthday = '<p>無効な入力です</p>';
    errorBirthday.innerHTML= errorMessageBirthday;
    ++err_flag;
  };

  //郵便番号入力チェック
  if( userZipcodeValue !== "" && userZipcodeValue.match(/^\d{3}-?\d{4}$/) ){
    errorZipcode.innerHTML=" ";
  }else{
    errorMessageZipcode = '<p>無効な入力です</p>';
    errorZipcode.innerHTML= errorMessageZipcode;
    ++err_flag;
  };

  //住所入力チェック
  if( userAddressValue !== "" && userAddressValue.match(/^.{10,64}$/) ){
    errorAddress.innerHTML=" ";
  }else{
    errorMessageAddress = '<p>無効な入力です</p>';
    errorAddress.innerHTML= errorMessageAddress;
    ++err_flag;
  };

  //メール入力チェック
  if(userMailValue.match(/^[A-Za-z0-9-._]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9]+[A-Za-z0-9-]{1,}\.[A-Za-z0-9]{1,}$/)){
    errorMail.innerHTML=" ";
  }else{
    errorMessageMail = '<p>無効な入力です</p>';
    errorMail.innerHTML= errorMessageMail;
    ++err_flag;
  }

  //メール入力チェック
  if(userConfirmMailValue.match(/^[A-Za-z0-9-._]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9]+[A-Za-z0-9-]{1,}\.[A-Za-z0-9]{1,}$/)){
    if(userMailValue === userConfirmMailValue){
      errorConfirmMail.innerHTML=" ";
    }
    else{
      errorMessageConfirmMail = '<p>emailと一致しません</p>';
      errorConfirmMail.innerHTML= errorMessageConfirmMail;
      ++err_flag;
    }
  }else{
    errorMessageConfirmMail = '<p>無効な入力です</p>';
    errorConfirmMail.innerHTML= errorMessageConfirmMail;
    ++err_flag;
  }

  //電話番号入力チェック
  if( userTelValue !== "" && userTelValue.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/) ){
    errorTel.innerHTML=" ";
  }else{
    errorMessageTel = '<p>無効な入力です</p>';
    errorTel.innerHTML= errorMessageTel;
    ++err_flag;
  };

  //個人情報保護方針入力チェック
  if( userPrivacyPolicyValue ){
    errorPrivacyPolicy.innerHTML=" ";
  }else{
    errorMessagePrivacyPolicy = '<p>個人情報保護方針に同意していません</p>';
    errorPrivacyPolicy.innerHTML= errorMessagePrivacyPolicy;
    ++err_flag;
  };

  console.log(userPrivacyPolicyValue);
  console.log(err_flag);
  checkConfirmButton(err_flag);
  
}


function checkConfirmButton(err_flag){
  if(err_flag === 0){
    confirmButton.disabled = false; //ボタン解除
  }
}


