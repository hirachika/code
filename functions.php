<?php

// テーマディレクトリまでのパスを定数にしておく
define("DIRE", get_template_directory_uri());

function add_files(){

    wp_enqueue_style('reset',DIRE.'/css/destyle.css');
    wp_enqueue_style('style',DIRE.'/style.css');
    wp_enqueue_script('script',DIRE.'/js/script.js');

}
add_action('wp_enqueue_scripts', 'add_files');

// ヘッダーでタイトルを出力する
add_theme_support( 'title-tag' );

// カスタムメニュー機能を有効化する
register_nav_menu('main_menu', 'メインメニュー');
