# 蒼井音呼 公式プロフィールサイト

## 正式な編集先

- このGitリポジトリ `aoineko/` を、今後のすべてのサイト更新の編集先とする。
- 公開ファイルはリポジトリ直下。`index.html`、`styles.css`、`script.js`、`site-config.js`、`assets/` を更新する。
- 隣接する `aoi-neko/`、`aoi-neko-site/`、ZIPファイルは旧版。変更しない。
- 既存のGit設定とユーザーの変更を保護する。コミットやpushは依頼がある場合に行う。

## 更新手順

- `script.js` または `site-config.js` を変更したら、このフォルダーで `node sync-site.mjs` を実行してHTML内のスクリプトにも反映する。
- プレビューはこのフォルダーで `node serve.mjs`。URLは `http://127.0.0.1:4173/`。
- 公開ドメインの変更時はcanonical、OGP、Twitter Card、JSON-LD、sitemap、robotsのURLを揃える。

## コンテンツとデザイン

- 公開名は「蒼井 音呼」「AOI INKO」（2026年9月28日の指定）。本文・メタ情報では「蒼井音呼」を使う。公開名以外の実名を追加しない。
- HERO、PROFILE、CAREER、HAIKU & WORKS、CONTACTの5セクションを維持する。
- 大人向けの水彩、自然、文学、余白を基本とし、本文の可読性を優先する。明るい青・若葉色・黄色を使い、動物は少しポップで親しみやすい表情にする。
- 犬は赤い首輪の柴犬。現在の素材は `assets/parakeet-pop.webp`、`assets/shiba-pop.webp`、`assets/career-flow.webp`、共有カードは `og-inko-20260928.png`。
- 本文の各セクションでは `assets/poses/` の動物を5種類ずつ使用。植物装飾は `assets/botanicals/` の枝葉・野の花・舞う葉・小径の草むら・花枝を各1回、非対称に配置する。同じ木を左右・各章に繰り返す旧構成へ戻さない。`assets/trees/` は旧素材として保持しているが現在は表示しない。
- 植物の外枠 `.ornament-slot` を検出し、内側 `.botanical-art` をフェードイン、その画像を一度だけ揺らす。本文への重なり、スマートフォンの横はみ出し、無限の揺れを避ける。
- 経歴は5つのイラストのフローを基本とし、詳細は開閉式。旧版の長文を再挿入しない。
- お問い合わせ先はユーザーが後日追加予定。未指定のアドレスを作らない。
- 掲載誌画像や俳句原文は提供された内容のみ使用する。未提供の作品や実績を創作しない。
- モバイル表示、キーボード操作、prefers-reduced-motionへの対応を維持する。
