# ドローンスクール LP サイト

ドローンサッカースクールのランディングページです。お問い合わせフォーム・ブログ記事管理・管理者画面を備えています。

## 技術スタック

| カテゴリ | 使用技術 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| 認証 | NextAuth.js |
| ORM | Prisma |
| DB | PostgreSQL（Supabase） |
| メール送信 | Nodemailer |
| テスト | Jest |

## 機能

- LP（ランディングページ）表示
- お問い合わせフォーム（メール送信）
- ブログ記事一覧・詳細表示
- 管理者画面（記事の作成・編集・削除）
- 認証（管理者ログイン）

## セットアップ

### 1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd my-company-lp
```

### 2. パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env` ファイルをルートに作成し、以下を設定してください：

```env
DATABASE_URL=postgresql://...

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```

### 4. DBのセットアップ

```bash
npx prisma migrate dev
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## テストの実行

```bash
# 全テスト実行
npm test

# ファイルを監視して自動実行
npm run test:watch
```

## ディレクトリ構成

```
├── app/
│   ├── api/          # APIルート（post / email / auth）
│   ├── admin/        # 管理者画面
│   ├── components/   # UIコンポーネント
│   └── posts/        # 記事一覧・詳細ページ
├── lib/              # 認証・DB・バリデーション
├── prisma/           # DBスキーマ
└── __tests__/        # テストコード
```
