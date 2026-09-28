# イラストの制作記録

現在の植物装飾5種類は [ASSET-BOTANICAL-PROMPTS.md](ASSET-BOTANICAL-PROMPTS.md) に記録しています。同じ木を繰り返す旧配置を改め、枝葉・野の花・舞う葉・小径・花枝を各セクションに描き分けました。

木々2種類と動物の追加10ポーズについては [ASSET-GARDEN-PROMPTS.md](ASSET-GARDEN-PROMPTS.md) に保存先と実行プロンプトを記録しています。

2026年9月28日改訂。生成方式: built-in image_gen。公開名の英字は AOI INKO。

インコと赤い首輪の柴犬を、明るい青・若葉色・黄色で描き直しました。WebPは透明背景を維持した800 × 800px、経歴フローは2000 × 800px。共有カードは1200 × 630pxのPNGです。Sharpによるサイズ調整・形式変換を行っています。

`og.png` は旧リンクとの互換用として新しい共有カードと同じ画像を保存しています。現在のHTMLは新しいファイル名 `og-inko-20260928.png` を参照します。旧版の `assets/parakeet.webp`、`assets/dog.webp`、`assets/landscape.webp` は現在のページでは使用しません。

元となる参考写真や掲載誌データは未提供です。人物の実物写真や実際の誌面を再現した画像ではありません。

## parakeet-pop

- モード: 編集（既存イラストを参照）
- 保存先: `assets/parakeet-pop.webp`
- 参照: 改訂前の `assets/parakeet.webp`

実行プロンプト:

```text
Use case: style-transfer. Edit the referenced blue budgerigar illustration for a Japanese literary profile website. Replace the very realistic, subdued watercolor rendering with a bright, gently playful editorial gouache and watercolor illustration. Preserve one blue budgerigar, full long tail, on a slender leafy branch. Make the bird friendly and cheerful with a slightly rounded head, gently smiling expressive face, small glossy lively eyes, simplified blue-and-cream plumage. A little pop cuteness, charming but not babyish or chibi, not cartoon merchandise. Brighter clear sky blue #4098BC, fresh leaf green #79B65A, cheerful golden yellow #F0CE58 little flowers. Delicate visible paper pigment within painted shapes, clean simplified brush edges, minimal feather detail. Full uncut bird and branch in centered square composition, generous clear margins. Truly transparent alpha background, no white rectangle, no checkerboard, no text, no logos. This is an original warm friendly adult-oriented Japanese picture-book editorial aesthetic.
```

## shiba-pop

- モード: 編集（既存イラストを参照）
- 保存先: `assets/shiba-pop.webp`
- 参照: 改訂前の `assets/dog.webp`

実行プロンプト:

```text
Use case: style-transfer. Edit the referenced dog illustration for a Japanese literary profile website. Change the dog into an unmistakable happy orange and cream SHIBA INU, with triangular upright ears, cream cheeks and muzzle, curled tail, and a clearly visible bright RED COLLAR around the neck. Full sitting body in a three-quarter pose facing a little to the left, cheerful smiling face and small friendly eyes, subtle little open smile, relaxed lifted head. Replace detailed realistic fur and muted watercolor with bright softly playful hand-painted editorial gouache and watercolor: simplified rounded forms, fine pigment texture, clean brush edges, slight pop cuteness but mature and tasteful, not chibi, not emoji, no exaggerated enormous eyes. Warm golden orange fur, cream-white chest, red collar #D9584C, a little fresh green grass #79B65A and two tiny golden yellow flowers #F0CE58 near feet. Full uncut dog and curled tail in centered square composition with generous clear margins. Truly transparent alpha background. No words, no frame, no paper rectangle, no checkerboard.
```

## career-flow

- モード: 新規生成
- 保存先: `assets/career-flow.webp`

実行プロンプト:

```text
Use case: illustration-story. Create ONE wide sheet containing EXACTLY FIVE isolated illustrated vignettes arranged left-to-right in five strictly equally wide columns. Landscape canvas 2560 x 1024 (aspect 2.5:1). Each vignette is centered in its column, with center x positions 256, 768, 1280, 1792, 2304 and all centered y512; keep each vignette within its own central 350x350 pixel region with large blank gaps. Background uniform #FFFEF8. There are no panel dividers, no outlines around panels, no arrows and absolutely NO text or letters. Vignette 1: small blue tennis racket and yellow tennis ball with a theatrical comedy mask and tiny fresh green leaves, representing student clubs and English theatre. Vignette 2: folded newspaper with simple abstract blue ink strokes, a cheerful yellow pencil and a green leaf, representing writing and reporting. Vignette 3: small fresh green classroom chalkboard and an open cream book, with a little yellow flower, representing teaching. Vignette 4: charming powder-blue video camera and small charcoal-and-cream clapperboard, with a little yellow accent, representing filmmaking. Vignette 5: open poetry notebook with a blue fountain pen, small blue budgerigar, and green leafy sprig, representing haiku. A coherent hand-painted Japanese editorial picture-book aesthetic: simplified rounded objects, colorful gouache with delicate watercolor grain and soft edges. Sophisticated mild pop cuteness, fresh bright green #79B65A, vivid sky blue #4098BC, cheerful soft golden yellow #F0CE58, cream paper. No photorealism, no detailed realism, no childish clipart, no dogs, no people, no brand names. The layout must remain exactly five equally spaced independent illustrations for a web career flow.
```

## og-inko-pop

- モード: 編集（既存イラストを参照）
- 保存先: `og-inko-20260928.png`
- 参照: 改訂前の `og.png`

実行プロンプト:

```text
Use case: style-transfer and text-localization. Edit the referenced social sharing card. Keep its landscape layout and clear Japanese typographic hierarchy, but make it brighter, fresh and gently playful. Target 1200x630 aspect ratio. Exact main title must remain '蒼井 音呼'. Replace Roman subtitle with EXACTLY 'AOI INKO' (not AOI NEKO). Keep exact tagline '俳句とことばのプロフィールサイト'. Use legible beautiful Mincho Japanese letters, generous whitespace and dark green ink #2E493D. At lower-left, show one cheerful blue budgerigar and one happy orange-and-cream SHIBA INU with erect triangular ears, curled tail and a clearly visible bright RED COLLAR. Replace the realistic painting style with hand-painted gouache and watercolor editorial illustration, slightly rounded simple forms, friendly smiling faces, restrained pop cuteness without becoming childish or chibi. Clear brighter sky blue #4098BC, fresh leaf green #79B65A replacing dull moss green, and more sunny golden yellow #F0CE58 small flowers around edges. Clean ivory background #FFFEF8. Keep all text safe from edges and animals. No other text or watermark. Ensure INKO is spelled I N K O.
```
