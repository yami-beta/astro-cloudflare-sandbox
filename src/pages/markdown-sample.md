---
layout: ../layouts/MarkdownPost.astro
title: "Markdownサンプルページ"
author: "山田太郎"
date: "2024-01-30"
description: "AstroでMarkdownページを作成するサンプルです。様々なMarkdown記法を紹介しています。"
tags: ["Markdown", "Astro", "サンプル"]
---

# Markdownサンプルページ

このページは、AstroでMarkdownファイルから生成されたページです。フロントマターを使用してメタデータを定義し、レイアウトを適用しています。

## 見出しレベル2

### 見出しレベル3

#### 見出しレベル4

##### 見出しレベル5

###### 見出しレベル6

## テキストの装飾

通常のテキストです。**太字のテキスト**と*イタリック体のテキスト*を使用できます。**_太字かつイタリック_**も可能です。

~~取り消し線~~も使用できます。

## リスト

### 順序なしリスト

- 項目1
- 項目2
  - ネストした項目2.1
  - ネストした項目2.2
    - さらにネストした項目2.2.1
- 項目3

### 順序付きリスト

1. 最初の項目
2. 二番目の項目
   1. サブ項目2.1
   2. サブ項目2.2
3. 三番目の項目

### タスクリスト

- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] 別の未完了タスク

## リンク

[Astro公式サイト](https://astro.build)へのリンク

[相対リンクでトップページへ](/)

## 画像

![Astroロゴ](https://astro.build/assets/press/astro-logo-dark.svg)

## 引用

> これは引用ブロックです。
> 複数行にわたる引用も可能です。
>
> > ネストした引用も作成できます。

## コード

### インラインコード

文章中に`const greeting = "Hello, Astro!"`のようにインラインコードを挿入できます。

### コードブロック

```javascript
// JavaScriptのコードブロック
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet("Astro");
console.log(message);
```

```typescript
// TypeScriptのコードブロック
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Astro User",
  age: 25,
};
```

```css
/* CSSのコードブロック */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
```

## テーブル

| ヘッダー1 | ヘッダー2 | ヘッダー3 |
| --------- | --------- | --------- |
| セル1-1   | セル1-2   | セル1-3   |
| セル2-1   | セル2-2   | セル2-3   |
| セル3-1   | セル3-2   | セル3-3   |

### 配置を指定したテーブル

| 左寄せ | 中央寄せ | 右寄せ |
| :----- | :------: | -----: |
| 左     |   中央   |     右 |
| Left   |  Center  |  Right |

## 水平線

---

## HTMLの埋め込み

<div style="background-color: #f0f0f0; padding: 1rem; border-radius: 8px;">
  <p style="color: #333;">HTMLタグを直接埋め込むこともできます。</p>
</div>

## 絵文字

Markdownでは絵文字も使用できます 🚀 ⭐ 🎉

## 脚注

これは脚注付きのテキストです[^1]。別の脚注もあります[^2]。

[^1]: 脚注の内容をここに記載します。

[^2]: 二番目の脚注の内容です。

## まとめ

このページでは、AstroでMarkdownページを作成する際に使用できる様々な記法を紹介しました。Markdownを使用することで、簡単に構造化されたコンテンツを作成できます。
