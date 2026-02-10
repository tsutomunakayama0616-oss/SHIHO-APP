# SHIHO-APP
# 🌿 育成アプリ（PWA対応・北欧パステル）

このアプリは、キャラクターと部屋が一緒に成長していく  
**やさしい世界観の育成ゲーム** です。

- ステータス管理（お腹・眠気・清潔・幸福・知力）
- アクションによる回復（食事・睡眠・入浴・遊び・勉強など）
- レベルアップで家具や服が解放
- 朝／夜の自動切り替え
- 着替え機能（プレビュー付き）
- 部屋の成長（家具追加・テーマ変更）
- 時間経過によるステータス自然減少
- PWA対応（ホーム画面追加・オフライン動作）

すべて **HTML / CSS / JavaScript のみ** で動作します。

---

## 📦 構成（フォルダなし・すべて並列配置）
index.html action_eat.html action_sleep.html action_bath.html action_toilet.html action_change.html action_play.html action_study.html
style.css app.js action.js
manifest.json service-worker.js
char_idle.png char_eat.png char_sleep.png char_bath.png char_toilet.png char_change.png char_play.png char_study.png
default.png outfit1.png outfit2.png
living_base.webp living_pastel.webp kitchen_base.webp bath_base.webp toilet_base.webp bedroom_base.webp study_base.webp closet_base.webp
cushion.png wall_art.png sofa_upgrade.png
icon-192.png icon-512.png


---

## 🚀 セットアップ

1. このリポジトリをクローンまたはダウンロード  
2. GitHub Pages を有効化  
   - Settings → Pages → Branch: `main` → `/root`  
3. 公開URLにアクセスするとアプリが動作します

---

## 📱 PWA（ホーム画面追加）

このアプリは PWA に対応しています。

- スマホのブラウザで開く  
- 「ホーム画面に追加」を選択  
- ネイティブアプリのように起動  
- オフラインでも動作

---

## 🎮 遊び方

### 1. ホーム画面
キャラのステータスが表示されます。

### 2. アクションを選ぶ
- 🍽 食事  
- 🛏 寝る  
- 🛁 入浴  
- 🚽 トイレ  
- 👕 着替え  
- 🎮 遊ぶ  
- 📚 勉強  

### 3. レベルアップ
XP が貯まるとレベルアップし、  
家具・服・テーマが解放されます。

### 4. 部屋の成長
レベルに応じて部屋が少しずつ豪華になります。

---

## 🧠 技術ポイント

- HTML / CSS / JavaScript のみで構築
- localStorage によるデータ保存
- Service Worker によるキャッシュ制御
- WebP 画像で高速化
- lazy-load 対応
- スマホ向け UI 最適化

---

## 📄 ライセンス

MIT License  
自由に改変・利用できます。

---

## ✨ 作者

Tsutomu  
北欧パステルのやさしい世界観を大切にした育成アプリです。
