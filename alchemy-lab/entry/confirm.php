<?php
ini_set( 'display_errors', 1 );
/******************************
* 初期化
*******************************/
$registerErrMessage = "";


/******************************
* ドメイン 設定
*******************************/
define("DOMAIN","https://".$_SERVER['SERVER_NAME']);

/******************************
* CSRF対策
*******************************/

//リファラーチェック
$referer = $_SERVER["HTTP_REFERER"];
$url = parse_url($referer);
$host = $url['host'];
$servername = $_SERVER['SERVER_NAME'];

if($host !== $servername)
{
  header("Location: " . DOMAIN);
  // echo "1";
  exit();
}
/******************************
* コントローラー（controller）
*******************************/
//バリデーション
if(empty($_POST))
{
  header("Location: " . DOMAIN);
  // echo "2";
  exit();
}
else
{
  if(!isset($_POST['subject']))
  {
    $registerErrMessage .= '件名が洗濯されていません<br>';
  }

  if(!isset($_POST['officerName']))
  {
    $registerErrMessage .= 'ご担当者お名前が入力されていません<br>';
  }

  if(!isset($_POST['mail']))
  {
    $registerErrMessage .= 'メールアドレスが入力されていません<br>';
  }

  if(!isset($_POST['tel']))
  {
    $registerErrMessage .= '電話番号が入力されていません<br>';
  }

  if(!isset($_POST['body']))
  {
    $registerErrMessage .= 'メッセージ本文が入力されていません<br>';
  }
}

//エラーチェック
function checkErrMessage($registerErrMessage)
{
  // echo '<pre>'; var_dump(boolval($registerErrMessage)); echo '</pre>';
  if(!$registerErrMessage)
  {
    return true;
  }
  else
  {
    //echo $registerErrMessage;
    header("Location: " . DOMAIN);
    // echo "6";
    exit();
  }
}

//リクエストパラメータの受け取り
if(checkErrMessage($registerErrMessage))
{
//   echo '<pre>'; var_dump($_POST); echo '</pre>';
  $subject = $_POST['subject'];
  $companyName = $_POST['companyName'];
  $officerName = $_POST['officerName'];
  $position = $_POST['position'];
  $mail = $_POST['mail'];
  $tel = $_POST['tel'];
  $wayToKnow = $_POST['wayToKnow'];
  $body = $_POST['body'];
  
  //type=hiddenのINPUT生成
  $hiddenInput  = "<input type='hidden' name='subject' value='$subject'>";
  $hiddenInput .= "<input type='hidden' name='companyName' value='$companyName'>";
  $hiddenInput .= "<input type='hidden' name='officerName' value='$officerName'>";
  $hiddenInput .= "<input type='hidden' name='position' value='$position'>";
  $hiddenInput .= "<input type='hidden' name='mail' value='$mail'>";
  $hiddenInput .= "<input type='hidden' name='tel' value='$tel'>";
  $hiddenInput .= "<input type='hidden' name='wayToKnow' value='$wayToKnow'>";
  $hiddenInput .= "<input type='hidden' name='body' value='$body'>";
}

/******************************
* views
*******************************/
$views = file_get_contents ($_SERVER['DOCUMENT_ROOT'] . '/confirm.html');
$views = str_replace('<!--SHOW_SUBJECT-->', $subject, $views);
$views = str_replace('<!--SHOW_COMPANY_NAME-->', $companyName, $views);
$views = str_replace('<!--SHOW_OFFICER_NAME-->', $officerName, $views);
$views = str_replace('<!--SHOW_POSITION-->', $position, $views);
$views = str_replace('<!--SHOW_MAIL-->', $mail, $views);
$views = str_replace('<!--SHOW_TEL-->', $tel, $views);
$views = str_replace('<!--SHOW_WAY_TO_KNOW-->', $wayToKnow, $views);
$views = str_replace('<!--SHOW_BODY-->', $body, $views);
$views = str_replace('<!--SHOW_HIDDEN_INPUT-->', $hiddenInput, $views);
echo $views;
