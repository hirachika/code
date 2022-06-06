# WordPressマニュアル
■ 前提
- エックスサーバーでドメイン取得済み
- ローカルでコーディングファイルを準備済み

## ①WordPressインストール
エックスサーバーの管理画面からWordPressをインストールする。  
[【わずか7分】エックスサーバーでワードプレス(ブログ)開設するまでの全手順【始め方とインストール方法】](https://www.youtube.com/watch?v=wZb0fj1EslI)

エックスサーバーの管理画面からWordPressをインストールすると、数分〜数時間かけてページが表示される。  
ダッシュボード(WordPressの管理画面)にログインする。

リニューアル案件など、サブディレクトリにインストールしたい場合はこちら。※一階層下にインストールするだけ  
[【WordPress】サブディレクトリとは？作り方画像付きで解説](https://manabuonline.com/subdirectory-sakusei/#index_id8)


## ②WordPress管理画面で基本設定
### 1.必要プラグインをインストールする
ダッシュボード＜プラグインから必要なプラグインをインストールしていく。
#### ■ Really Simple SSL ※必須
- URLを保護するためにインストールする、有効化した後『https』になっていることを確認する。
- 画面では「70％」「まだ6作業あります」と表示されるが、この作業を行わなくても設定上大きな問題はない（「非表示」か右端の×印を押してOK）。  
[最初にやっておきたいWordPress初期設定](https://rakkoserver.com/knowledge/693/)

#### ■ BackWPup ※必須
- ファイルやデータベースの自動バックアップを設定する。  
[BackWPUpで確実にWordPressのバックアップを取る方法](https://lucy.ne.jp/bazubu/how-to-use-backwpup-3-23804.html)  
※**バックアップを格納するフォルダー**のパスを間違えないようにする。  
※Basic認証がかかっているとバックアップが取れない。

#### ■ EWWW Image Optimizer
[2022年最新 EWWW Image Optimizerの設定とWebPへの変換方法](https://ikuzoblog.com/ewww-webp)

#### ■ All in One SEO
[All in One SEOの設定方法と使い方](https://lucy.ne.jp/bazubu/all-in-one-seo-pack-3-23836.html)

### 2.パーマリンク設定
ダッシュボード＜パーマリンクの＜共通設定の**カスタム構造**のデフォルトを`/%category%/%postname%/`or`/%postname%/`にする。

### 3.表示設定
ダッシュボード＜表示設定から**検索エンジンがサイトをインデックスしないようにする**にチェックを入れる。
- 公開時にはこのチェックを外す。
- また各ページごとにnoindexさせたい場合は（お問合せページやプラポリなどインデックスが不要なページ）の各記事の**Advanced**タブの**Use Default Settings**をOFFにして、No Indexにチェックをつける。

## ③アクセス制限(Basic認証)

一度WordPressの管理画面にログインしてダッシュボードを確信できたら、設定をしていく前に、公開前のページが外部から確認できないようにアクセス制限(Basic認証)をする。  
今回は、エックスサーバーの管理画面からアクセス制限をかける。  
[エックスサーバーでアクセス制限するBasic認証を設定する](https://shu-sait.com/xserver-access-seigen-basic/)

ちゃんとアクセス制限がかかっているか、アクセスして確認する。

▼サーバーによっては管理画面で設定できない場合のあるため、FTPツールから対応する。  
[【プラグイン不要】WordPressサイトに手動でBASIC認証をかける方法](https://tcd-theme.com/2021/09/wordpress-basic-authentication.html)

## ④自作テーマを作る
