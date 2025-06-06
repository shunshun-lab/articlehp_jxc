# japan_x_college 記事ビューア

Next.js、TypeScript、Tailwind CSS、shadcn/uiを使用して作成された記事ビューアアプリケーションです。japan_x_collegeアカウントのnote記事をAPI経由で取得し、人物タグやジャンルタグで分類・検索・並べ替えができ、さまざまなビュー形式（テーブル/カード/カレンダー）で表示できます。また、好みのカスタムビューを保存して呼び出すこともできます。

## 機能

- **自動API取得**:
  - note APIから japan_x_college のすべての記事を自動取得
  - 本文から人物タグとジャンルタグを自動抽出

- **複数のビュー形式**:
  - テーブルビュー: 記事を表形式で表示し、列のソートが可能
  - カードビュー: 人物ごとにカードでグループ化して表示
  - カレンダービュー: 公開日を軸にカレンダー上に記事をマッピング

- **高度なフィルタリングとソート**:
  - 人物タグによるフィルタリング
  - ジャンルタグによるフィルタリング
  - キーワード検索（タイトル・タグに対して）
  - 複数のフィールドによるソート（公開日、タイトル、インデックス）
  - ソート方向の切り替え（昇順/降順）

- **カスタマイズ**:
  - テーブルビューの表示カラム設定
  - 現在のビュー設定を保存（名前をつけて保存）
  - 保存したビュー設定を呼び出し

## 技術スタック

- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- shadcn/ui
- FullCalendar
- 状態管理: React Hooks（useState, useEffect）
- ローカルストレージ（ビュー設定の保存に使用）
- note API（japan_x_collegeの記事取得）

## 必要なパッケージ

主要な依存関係：

```
"dependencies": {
  "next": "latest",
  "react": "latest",
  "react-dom": "latest",
  "@fullcalendar/core": "^6.1.10",
  "@fullcalendar/daygrid": "^6.1.10",
  "@fullcalendar/interaction": "^6.1.10",
  "@fullcalendar/react": "^6.1.10",
  "@fullcalendar/timegrid": "^6.1.10",
  "uuid": "^9.0.1"
}
```

## セットアップ手順

### ローカル開発環境を起動する

1. リポジトリをクローン:
```bash
git clone <リポジトリURL>
cd <リポジトリ名>
```

2. 依存関係をインストール:
```bash
npm install
```

3. 開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで以下のURLにアクセス:
```
http://localhost:3000
```

## note APIの仕様

このアプリケーションでは、note APIを使用してjapan_x_collegeアカウントの記事を取得しています。

### API エンドポイント

```
https://note.com/api/v2/creators/{username}/contents?kind=note&page={pageNumber}
```

- `username`: noteのユーザー名（この場合は `japan_x_college`）
- `pageNumber`: ページ番号（1から始まる）

### API更新頻度

APIへのアクセスは1日1回に制限されています。具体的な動作は以下の通りです：

1. 最初のアクセス時にnote APIからデータを取得し、キャッシュに保存します
2. 以降24時間は、すべてのリクエストに対してキャッシュされたデータを返します
3. 24時間経過後の最初のリクエストで、再度APIからデータを取得して更新します

これにより、不要なAPI呼び出しを減らし、アプリケーションのパフォーマンスを向上させると同時に、note APIへの負荷も軽減しています。

### リンク情報の取得

記事内のリンクは自動的に抽出され、タグとして追加されます。各リンクは以下の形式でタグ化されます：

```
リンク:example.com
```

これにより、特定のサイトへのリンクがある記事を簡単に検索・フィルタリングできます。

### ダミーデータの利用

開発中やnote APIにアクセスできない場合は、ダミーデータを使用することができます。アプリケーションは以下の順序でデータを取得します：

1. まず、本番のnote APIエンドポイント (`/api/notes`) にアクセスを試みます
2. 本番APIへのアクセスに失敗した場合、自動的にダミーデータエンドポイント (`/api/notes/dummy`) にフォールバックします
3. ダミーデータを使用している場合は画面上に通知が表示されます

ダミーデータには12件のサンプル記事が含まれており、アプリケーションの全機能をテストすることができます。

### 人物名の抽出方法

記事本文から人物名を精度高く抽出するために、以下の複数のパターンマッチングを採用しています：

1. **敬称付きの人物名**: 「〇〇さん」「〇〇氏」「〇〇教授」などのパターン
2. **インタビュー形式**: 「Q: 〇〇」「インタビュー: 〇〇」などのパターン
3. **著者情報**: 「著者は〇〇」「執筆者：〇〇」などのパターン 
4. **所属付き人物名**: 「〇〇（△△大学）」などのパターン
5. **自己紹介文**: 「〇〇と申します」「〇〇です。私は」などのパターン
6. **タイトルからの抽出**: 「〇〇のインタビュー」「〇〇による講演」などのパターン

また、人物名として不適切なキーワード（組織名や一般的な名詞など）を除外するフィルタリングも適用しています。

抽出された人物名は、手動タグファイル（`data/manual_tags.json`）に定義されている場合はそちらが優先されます。

### ページネーション

note APIは一度に取得できる記事数が限られているため、すべての記事を取得するにはページネーションが必要です。APIレスポンスの `isLastPage` フラグを使用して、すべてのページを取得したかどうかを判断しています。

### データ抽出

note APIのレスポンスには `people` や `tags` フィールドが含まれていないため、アプリケーション側で本文から抽出しています。

- 人物タグ: 記事本文や記事タイトルからパターンマッチングで抽出
- ジャンルタグ: ハッシュタグや特定のキーワードから抽出

## people/tagsの編集方法

自動抽出された人物タグやジャンルタグは必ずしも正確ではないため、必要に応じて手動で編集できます。`data/manual_tags.json` ファイルを作成して以下のフォーマットで記事ごとのタグ情報を定義することができます:

```json
{
  "記事ID": {
    "people": ["人物1", "人物2"],
    "tags": ["タグ1", "タグ2"]
  }
}
```

このファイルがある場合、APIから取得したデータと自動マージされ、手動定義したタグが優先されます。

## 使用方法

### ビュー切り替え

上部の「テーブル」「カード」「カレンダー」ボタンをクリックして、ビュー形式を切り替えることができます。

### フィルタリングとソート

1. **人物でフィルタリング**:
   - 「人物: 選択」ボタンをクリックしてフィルタリングする人物を選択

2. **タグでフィルタリング**:
   - 「タグ: 選択」ボタンをクリックしてフィルタリングするタグを選択

3. **キーワード検索**:
   - 検索ボックスにキーワードを入力してリアルタイム検索

4. **ソート**:
   - 「並び替え」ドロップダウンでソートするフィールドを選択
   - 「昇順/降順」ボタンでソート方向を切り替え
   - テーブルビューでは列ヘッダーをクリックしてもソート可能

### カスタムビュー

1. **ビューの保存**:
   - 現在のビュー設定（表示タイプ、ソート、フィルタ、表示カラム）を「ビューを保存」ボタンで保存
   - ダイアログでビュー名を入力して保存

2. **保存済みビューの適用**:
   - 「保存済みビュー」ボタンをクリックして、保存済みのビューを選択
   - 選択したビューの設定が適用されます

3. **保存済みビューの削除**:
   - 「保存済みビュー」メニューで、削除したいビューの横にある「✕」ボタンをクリック
