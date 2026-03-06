# SES Simulator

単金と利益率から、SES営業版のロジックで推定月給・年収を計算し、固定の簡易税モデルで手取り概算を表示するツールです。

## 主な仕様

- 基本計算は `12salary-simulator` の単金→給与ロジックに準拠
- 都道府県（協会けんぽ料率）と `40歳以上` の介護保険を反映
- 税社保の手取り計算は固定簡易モデル（ユーザー調整なし）
- 福利厚生補正・NISA/iDeCo/DC/持株会の将来資産を任意で加算

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:3002` で確認できます。

## Vercel デプロイ

1. `30_Tools/ses-simulator` を Vercel プロジェクトの Root Directory に指定
2. Framework Preset は `Next.js`
3. Build Command は既定（`next build`）
4. Output Directory は既定（空欄）
5. Deploy を実行

追加の環境変数は不要です。
