'use strict';
/**********************
 * VALIDATION
***********************/

/**************************************************
 * バリデーション全般を行います
 * @function checkEmpty → 未入力チェック
 * @param value :string → 入力値
 * ***
 * @function checkLength → 文字数チェック
 * @param value        :string → 入力値
 * @param minLength    :int    → 許容可能最小文字数
 * @param maxLength    :int    → 許容可能最大文字数
 * ***
 * @function checkType    → パターンチェック
 * @param value  :string → 入力値
 * @param regexp :string → 型
 * ***
 * @function checkValidation → 全部チェック　   
 * @param input        :HTMLElement 入力値をチェックするinput要素
 * @param minLength    :int 入力値の許容可能最小文字数
 * @param maxLength    :int 入力値の今日可能最大文字数
 * @param item         :string 入力の項目
 * @param regexp       :string 入力値の正規表現
 *****************************************************/

export function checkIsValid ($input, $item, $minLength, $maxLength, $regexp) {
    const checkEmpty = (value) => {
        if (value.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    
    const checkLength = (minLength, maxLength, value) => {
        if (value.length < minLength || value.length > maxLength) { 
            return false;
        } else {
            return true;
        }
    }
    
    const checkType = (regexp, value) => {
        if (!value.match(regexp)) {
            return false;
        } else {
            return true;
        }
    }

    const value = $input.value;
    const whetherEmpty = checkEmpty(value);
    const item = $item;
    const minLength = $minLength;
    const maxLength = $maxLength;
    const isValidLength = checkLength(minLength, maxLength, value);
    const isValidPattern = checkType($regexp, value, item);
    let returnValue;

    if (whetherEmpty) {
        if (isValidLength) {
            if (isValidPattern) {
                returnValue = '';
            } else {
                returnValue = `${item}が正しく入力されていません\n`;
            }
        } else {
            returnValue = `${item}は${minLength}文字以上${maxLength}文字以下で入力してください\n`;
        }
    } else {
        returnValue = `${item}が未入力です\n`;
    }
    return returnValue;
}
