<?php

//メールタイトル
$subject_admin = "【お問い合わせ】株式会社ALCHEMY";

//メール本文
$message_admin = <<< EOM
[ 件名 ] $subject
[ 会社名 ] $companyName
[ ご担当者お名前 ] $officerName
[ 役職 ] $position
[ メールアドレス ] $mail
[ 電話番号 ] $tel
[ 弊社を知ったきっかけ ] $wayToKnow
[ メッセージ本文 ] $body
──────────────────────────
EOM;

