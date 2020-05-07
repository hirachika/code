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

if(checkErrMessage($registerErrMessage))
{
  //リクエストパラメータの受け取り
  // echo '<pre>'; var_dump($_POST); echo '</pre>';

  $subject = $_POST['subject'];
  $companyName = $_POST['companyName'];
  $officerName = $_POST['officerName'];
  $position = $_POST['position'];
  $mail = $_POST['mail'];
  $tel = $_POST['tel'];
  $wayToKnow = $_POST['wayToKnow'];
  $body = $_POST['body'];
  
  /******************************
  * メール本文呼び込み
  *******************************/
  require_once ( $_SERVER['DOCUMENT_ROOT'].'/entry/usermail.php' );//ユーザー送信テキスト
  require_once ( $_SERVER['DOCUMENT_ROOT'].'/entry/adminmail.php' );//管理者送信テキスト
  
  
  //ユーザーへのメールの送信
  if(!sendMail($mail, $subject_user, $message_user))
  {
    header("Location: " . DOMAIN);
    // echo __LINE__;
    exit();
  }
  else
  {
    // echo 'successed. send a mail to user <br />';
  }



  //管理者へのメールの送信
  $mail = "tsuzuki@alchemy-lab.jp";//管理者に送るメールアドレス
  if(!sendMail($mail, $subject_admin, $message_admin))
  {
    header("Location: " . DOMAIN . "/404.html");
    // echo __LINE__;
    exit();
  }
  else
  {
    // echo 'successed. send a mail to admin <br />';
  }

  if(checkErrMessage($registerErrMessage))
  {
    header("Location: " . DOMAIN . "/completion.html");
    // echo "locate to completion page";
    exit();
  }
}


function sendMail($mail, $subject, $message)
{

  //日本語使用宣言
  mb_language("Japanese");
  mb_internal_encoding("UTF-8");

  $mailname = "alchemy-lab.jp";
  $sender_email = 'tsuzuki@alchemy-lab.jp';
  $org = 'alchemy-lab.jp';
  $from = "alchemy-lab.jp";
  //$to .= "r.sasaki815@gmail.com" //送り先
  //$to = "$login_id" . ", "; //送り先

  $headers = "";
  $headers .= "Content-Type: multipart/mixed;boundary=\"__BOUNDARY__\"\n";
  $headers .= "Return-Path: " . $sender_email . " \n";
  $headers .= "From: " . mb_encode_mimeheader (mb_convert_encoding($mailname,"ISO-2022-JP","AUTO")) . "<" . $sender_email . ">" . "\r\n";
  $headers .= "Sender: " . $from ." \n";
  $headers .= "Reply-To: " . $sender_email . " \n";
  $headers .= "Organization: " . $org . " \n";
  $headers .= "X-Sender: " . $org . " \n";
  $headers .= "X-Priority: 3 \n";
  //$headers .= "Cc: foo@hoge.co.jp" . "\r\n"; //送り先
  //$headers .= "Cc: ber@hoge.co.jp" . "\r\n"; //送り先
  //$headers .= "Bcc: $mail_item" . "\r\n"; //送り先

  // テキストメッセージを記述
  $body = "--__BOUNDARY__\n";
  $body .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n\n";
  $body .= $message . "\n";
  $body .= "--__BOUNDARY__\n";

  if (mb_send_mail($mail, $subject, $body, $headers))
  {
    //正常終了時に処理があれば
    $result = true;
  }
  else
  {
    $result = false;
  }

  return $result;
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
    //header("Location: " . DOMAIN);
    echo "6";
    exit();
  }
}

