'use strict';
import {checkIsValid} from './validate.js';

const ENTRY_FORM = document.forms.entry;
const SEND_BTN   = document.getElementById ('sendButton');
const SUBJECT    = document.getElementById ('subject');
const OFFICER    = document.getElementById ('officerName');
const E_MAIL     = document.getElementById ('mail');
const TEL_NUM    = document.getElementById ('tel');
const BODY       = document.getElementById ('body');

const NAME_REGEXP = /^.*$/; //名前
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //メールアドレス
const TEL_REGEXP =/^0\d{2,3}\d{1,4}\d{4}$/ //電話番号

/**************************** 元々のものから少し省いたもの ****************************/

/**
 * SEND_MAIL 
 * MAILを送っても良いかの確認 + バリデーション
 * HTMLから呼び出し
 */
SEND_BTN.addEventListener ('click', () => {
    let attentionMessage = "";
    let validSubject = checkIsValid (SUBJECT, '件名', 1, 100, NAME_REGEXP);
    let validOfficer = checkIsValid (OFFICER, '担当者様のお名前', 1, 50, NAME_REGEXP);
    let validEmail   = checkIsValid (E_MAIL, 'メ－ルアドレス', 6, 100, EMAIL_REGEXP);
    let validTel     = checkIsValid (TEL_NUM, '電話番号', 10, 11, TEL_REGEXP);
    let validBody    = checkIsValid (BODY, 'メッセ－ジの本文', 0, 3000, NAME_REGEXP);
    
    attentionMessage += `${validSubject}${validOfficer}${validEmail}${validTel}${validBody}`;
    if(attentionMessage === ''){
        if(confirm("送信してもよろしいですか？")){
            ENTRY_FORM.submit ();
            return true;
        }
        else{
            return false;
        }
    }
    else{
        alert(attentionMessage);
        return false;
    }
}, false);

