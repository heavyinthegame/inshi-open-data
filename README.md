# inshi-open-data

日本の大学院入試（院試）の過去問について、[院試hub](https://inshihub.com) が集めて整理したデータです。大学公式の過去問の配布先、研究科・科目ごとの出題テーマ、テーマ別の出題大学を JSON と CSV で置いています。問題本文と解答は含みません。

| ファイル | 内容 |
| --- | --- |
| [`data/official-past-exams.json`](data/official-past-exams.json) | 大学・研究科ごとの公式過去問の配布ページURL、公開年度、公式解答の有無、英語問題の扱い、最終確認日 |
| [`data/official-past-exams.csv`](data/official-past-exams.csv) | 上と同じ内容のCSV |
| [`data/graduate-schools.json`](data/graduate-schools.json) | 研究科・科目ごとの収録年度、大問のテーマ別の件数、研究科ページ・解答PDF・公式過去問のURL、確認済みの入試日程 |
| [`data/themes.json`](data/themes.json) | 出題テーマ（固有値・固有ベクトル、留数定理、調和振動子など）ごとの出題大学・件数・年度 |
| [`data/source.json`](data/source.json) | 取得元のURLと件数 |

件数は `data/source.json` を見てください。データは院試hubの公開ページ（[公開データの説明](https://inshihub.com/resources/data)）と同じもので、解説の追加やテーマ分類の更新にあわせてこのリポジトリも更新します。コミットの差分で、どの研究科の情報がいつ変わったかを追えます。

## 使い方の例

- 志望校の公式過去問がどこにあるか、公式解答があるかを調べる：`official-past-exams.json`
- 志望先と出題テーマが近い研究科を探す：`graduate-schools.json` の `themes` を比べる（ブラウザでは [院試の併願先を探す](https://inshihub.com/resources/combination-finder)）
- テーマごとにどの大学が何年度に出したかを見る：`themes.json`（ブラウザでは [院試 頻出テーマ一覧](https://inshihub.com/exam-themes)）

## AIツールから使う

読み取り専用のMCPサーバーを `https://inshihub.com/mcp` で公開しています（Streamable HTTP、認証なし）。科目の検索、出題テーマが近い併願先、テーマ別の出題大学、公式過去問の配布先の4つのツールがあります。

```bash
claude mcp add --transport http inshihub https://inshihub.com/mcp
```

院試hubの年度別解説は、URLの末尾に `/index.md` を付けると、数式をLaTeXのまま残したMarkdownで取得できます。

```
https://inshihub.com/exam-solutions/{university}/{graduateSchool}/{subject}/{year}/index.md
```

## ライセンス

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja)。記事・ツール・研究室の資料などに自由に使えます。出典として「院試hub（https://inshihub.com）」を示してください。

配布ページのURLや年度は大学側の更新で変わります。出願や受験の判断は、必ず各大学の募集要項と公式ページで確かめてください。誤りを見つけたら Issue で知らせてください。

---

Open data on Japanese graduate school entrance exams (院試): where each university publishes its official past papers, whether official answers exist, and how exam questions break down by topic. Licensed under CC BY 4.0 — please credit [院試hub (inshihub.com)](https://inshihub.com). No exam text or solutions are included.
