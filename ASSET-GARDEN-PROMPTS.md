# 木々と動物の追加ポーズ — 制作記録

生成方式: built-in image_gen（内蔵ツール）。2026年9月28日追加。

既存のインコ・赤い首輪の柴犬をキャラクターと画風の参考に、各5ポーズを新規制作。木々は参考画像なしの新規制作です。生成したアルファチャンネルを維持し、SharpでWeb用のサイズ・WebP形式に変換しました。動物は720 × 720px、木々は600 × 900px。元画像は上書きしていません。

スクロールの演出は、素材の外側で左右の移動・フェード、内側で4.8秒の揺れを一度再生します。スマートフォンでは木々を小さく見せ、本文の余白を保っています。

## 羽を広げる

保存先: `assets/poses/parakeet-wings.webp`

参考画像: `assets/parakeet-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached blue budgerigar only as a character and style reference. Preserve the same cheerful blue-and-cream budgerigar, yellow beak, dark little eyes, delicate watercolor/gouache grain, simplified rounded editorial forms and slightly pop cuteness. Clear sky blue #4098BC, fresh green #79B65A and tiny golden-yellow accents #F0CE58 where applicable. One bird only, no text, no logos, no frame, no white paper rectangle, no checkerboard. Truly transparent alpha background. Square 1024x1024 composition, full uncut animal with clean generous margins. Pose: the bird is stretching BOTH wings open in a wide graceful V while lightly perched on one short thin fresh-green sprig. Three-quarter view, looking happily to the right. Show both wings and long tail fully, feather shapes graphic and soft.
```

## 空を見上げる

保存先: `assets/poses/parakeet-sky.webp`

参考画像: `assets/parakeet-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached blue budgerigar only as a character and style reference. Preserve the same cheerful blue-and-cream budgerigar, yellow beak, dark little eyes, delicate watercolor/gouache grain, simplified rounded editorial forms and slightly pop cuteness. Clear sky blue #4098BC, fresh green #79B65A and tiny golden-yellow accents #F0CE58 where applicable. One bird only, no text, no logos, no frame, no white paper rectangle, no checkerboard. Truly transparent alpha background. Square 1024x1024 composition, full uncut animal with clean generous margins. Pose: perched upright on a small leafy branch, body in three-quarter side view, head clearly tilted UPWARD toward the sky with a curious bright expression. Wings folded. Distinctly looking up, not the neutral forward-facing reference pose. A tiny yellow flower on the twig.
```

## 飛ぶ

保存先: `assets/poses/parakeet-flying.webp`

参考画像: `assets/parakeet-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached blue budgerigar only as a character and style reference. Preserve the same cheerful blue-and-cream budgerigar, yellow beak, dark little eyes, delicate watercolor/gouache grain, simplified rounded editorial forms and slightly pop cuteness. Clear sky blue #4098BC, fresh green #79B65A and tiny golden-yellow accents #F0CE58 where applicable. One bird only, no text, no logos, no frame, no white paper rectangle, no checkerboard. Truly transparent alpha background. Square 1024x1024 composition, full uncut animal with clean generous margins. Pose: flying freely toward the right and slightly upward, full body in profile, both wings gracefully swept back and upward, long tail trailing toward left. Feet tucked naturally. No branch, no ground, no motion lines. Buoyant calm flight, cheerful face.
```

## 羽づくろい

保存先: `assets/poses/parakeet-preening.webp`

参考画像: `assets/parakeet-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached blue budgerigar only as a character and style reference. Preserve the same cheerful blue-and-cream budgerigar, yellow beak, dark little eyes, delicate watercolor/gouache grain, simplified rounded editorial forms and slightly pop cuteness. Clear sky blue #4098BC, fresh green #79B65A and tiny golden-yellow accents #F0CE58 where applicable. One bird only, no text, no logos, no frame, no white paper rectangle, no checkerboard. Truly transparent alpha background. Square 1024x1024 composition, full uncut animal with clean generous margins. Pose: gently preening its wing feathers, perched with body turned three-quarter right, head turned back so beak touches the upper wing. Soft relaxed expression, wings otherwise folded and long tail visible. A short branch with only two small fresh green leaves.
```

## さえずる

保存先: `assets/poses/parakeet-singing.webp`

参考画像: `assets/parakeet-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached blue budgerigar only as a character and style reference. Preserve the same cheerful blue-and-cream budgerigar, yellow beak, dark little eyes, delicate watercolor/gouache grain, simplified rounded editorial forms and slightly pop cuteness. Clear sky blue #4098BC, fresh green #79B65A and tiny golden-yellow accents #F0CE58 where applicable. One bird only, no text, no logos, no frame, no white paper rectangle, no checkerboard. Truly transparent alpha background. Square 1024x1024 composition, full uncut animal with clean generous margins. Pose: singing cheerfully from a tiny curved twig, beak slightly open, face lifted, eyes softly smiling, chest lifted and one foot resting lightly on the twig. Small fresh leaves and a tiny yellow bud. No musical notes or symbols. Distinct warm happy expression.
```

## お座り

保存先: `assets/poses/shiba-sitting.webp`

参考画像: `assets/shiba-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached Shiba Inu only as a character and style reference. Preserve the same friendly orange-and-cream SHIBA INU with erect triangular ears, curled tail and clearly visible RED COLLAR #D9584C. Simplified rounded editorial watercolor and gouache forms, cheerful slightly pop cuteness, delicate pigment texture, no photorealistic fur. Full uncut body in a square 1024x1024 frame with generous transparent margins. Exactly one dog. No text, logos, ground rectangle, shadows outside the subject, checkerboard or white paper background. Truly transparent alpha background. Pose: seated facing almost directly forward, head tilted playfully toward its left shoulder, warm open smile, ears alert, two front paws visible together, curled tail visible to side. Distinct front-facing pose from reference. No scenery except two tiny green grass strokes near one paw.
```

## 走る

保存先: `assets/poses/shiba-running.webp`

参考画像: `assets/shiba-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached Shiba Inu only as a character and style reference. Preserve the same friendly orange-and-cream SHIBA INU with erect triangular ears, curled tail and clearly visible RED COLLAR #D9584C. Simplified rounded editorial watercolor and gouache forms, cheerful slightly pop cuteness, delicate pigment texture, no photorealistic fur. Full uncut body in a square 1024x1024 frame with generous transparent margins. Exactly one dog. No text, logos, ground rectangle, shadows outside the subject, checkerboard or white paper background. Truly transparent alpha background. Pose: a joyful RUN to the RIGHT in clear side view, all four legs in a natural running stride, lifted forepaw and stretching hind leg, mouth slightly open, ears perked, red collar obvious, curled tail bouncing above back. Friendly light movement, not aggressive. No motion lines or scenery.
```

## 歩く

保存先: `assets/poses/shiba-walking.webp`

参考画像: `assets/shiba-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached Shiba Inu only as a character and style reference. Preserve the same friendly orange-and-cream SHIBA INU with erect triangular ears, curled tail and clearly visible RED COLLAR #D9584C. Simplified rounded editorial watercolor and gouache forms, cheerful slightly pop cuteness, delicate pigment texture, no photorealistic fur. Full uncut body in a square 1024x1024 frame with generous transparent margins. Exactly one dog. No text, logos, ground rectangle, shadows outside the subject, checkerboard or white paper background. Truly transparent alpha background. Pose: taking a relaxed WALK toward the LEFT in three-quarter view, one front paw lifted, head slightly looking down as though discovering something on a stroll, happy interested expression, curled tail upright, red collar visible. Two tiny green leaves near its paws, no scenery.
```

## 伏せる

保存先: `assets/poses/shiba-resting.webp`

参考画像: `assets/shiba-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached Shiba Inu only as a character and style reference. Preserve the same friendly orange-and-cream SHIBA INU with erect triangular ears, curled tail and clearly visible RED COLLAR #D9584C. Simplified rounded editorial watercolor and gouache forms, cheerful slightly pop cuteness, delicate pigment texture, no photorealistic fur. Full uncut body in a square 1024x1024 frame with generous transparent margins. Exactly one dog. No text, logos, ground rectangle, shadows outside the subject, checkerboard or white paper background. Truly transparent alpha background. Pose: lying comfortably on its belly with front paws stretched forward and head lifted toward the left, gentle happy smile, ears upright, curled tail resting beside body. Calm companionable resting dog, eyes open. Tiny yellow flower near one paw, otherwise no scenery.
```

## 遊びに誘う

保存先: `assets/poses/shiba-playbow.webp`

参考画像: `assets/shiba-pop.webp`（キャラクター・画風の参照）

実行プロンプト:

```text
Use case: illustration-story. New transparent website character illustration, using the attached Shiba Inu only as a character and style reference. Preserve the same friendly orange-and-cream SHIBA INU with erect triangular ears, curled tail and clearly visible RED COLLAR #D9584C. Simplified rounded editorial watercolor and gouache forms, cheerful slightly pop cuteness, delicate pigment texture, no photorealistic fur. Full uncut body in a square 1024x1024 frame with generous transparent margins. Exactly one dog. No text, logos, ground rectangle, shadows outside the subject, checkerboard or white paper background. Truly transparent alpha background. Pose: friendly PLAY BOW facing to the LEFT, chest and front paws lowered, hindquarters lifted, curled tail up, big gentle playful smile, alert ears and clearly visible red collar. Natural proportions and all four paws readable; mild pop cuteness, tasteful. No scenery.
```

## 若葉の木

保存先: `assets/trees/tree-leafy.webp`

参考画像なし。新規生成。

実行プロンプト:

```text
Use case: illustration-story. Standalone graceful small deciduous tree for the side margin of a Japanese literary website, original softly playful watercolor and gouache illustration. Vertical portrait 1024x1536 composition. One slender gently curving warm-brown trunk with airy irregular branches and many bright fresh green #79B65A and light yellow-green leaves, a few golden-yellow #F0CE58 leaves, a little skyblue pigment. Branch tips gently bend inward to the RIGHT. Visible pigment grain, soft hand-painted edges, elegant and friendly, not photorealistic, not dense or heavy, no forest background. Full tree including canopy and small roots entirely visible with generous margin. Truly transparent alpha background, no paper rectangle, no white or checkerboard background, no people or animals, no text.
```

## 黄色い花の木

保存先: `assets/trees/tree-flowering.webp`

参考画像なし。新規生成。

実行プロンプト:

```text
Use case: illustration-story. Standalone slender flowering small tree for the side margin of a Japanese literary website, original softly playful watercolor and gouache illustration. Vertical portrait 1024x1536 composition. One gently curving light brown trunk with open airy branches and bright fresh green leaves #79B65A, clusters of small cheerful golden yellow #F0CE58 flowers, delicate pale green washes only within foliage. Branch tips gently bend inward to the LEFT. Visible watercolor pigment grain, simplified soft editorial forms, tasteful adult storybook mood, no realistic forest scene. Full tree including canopy and tiny roots entirely visible with generous clear margins. Truly transparent alpha background, no paper rectangle, no white or checkerboard background, no people or animals, no text.
```
