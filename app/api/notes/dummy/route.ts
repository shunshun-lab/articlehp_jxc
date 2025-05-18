import { NextResponse } from 'next/server';
import { Article } from '@/types/article';

/**
 * 開発用のダミーデータを返すAPIルート
 */
export async function GET() {
  // ダミーの記事データ
  const dummyArticles: Article[] = [
    {
      id: "dummy1",
      title: "サンプル記事1: プログラミング入門",
      note_url: "https://note.com/japan_x_college/n/dummy1",
      published_at: "2023-01-15",
      people: ["山田太郎", "佐藤次郎"],
      tags: ["プログラミング", "初心者向け", "Python", "リンク:github.com"],
      article_links: [
        { url: "https://github.com/example/python-intro", domain: "github.com" },
        { url: "https://python.org", domain: "python.org" }
      ],
      sort_index: 1,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92701315/rectangle_large_type_2_71bfb44cf9cb3e737a647a6fa521eab1.jpg"
    },
    {
      id: "dummy2",
      title: "サンプル記事2: デザイン思考を学ぶ",
      note_url: "https://note.com/japan_x_college/n/dummy2",
      published_at: "2023-02-20",
      people: ["佐藤花子"],
      tags: ["デザイン", "UX", "思考法", "リンク:medium.com"],
      article_links: [
        { url: "https://medium.com/design-thinking-intro", domain: "medium.com" }
      ],
      sort_index: 2,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92658444/rectangle_large_type_2_9b2e0a492182dc47bdf21e25108bf2b7.png"
    },
    {
      id: "dummy3",
      title: "サンプル記事3: AIと機械学習の基礎",
      note_url: "https://note.com/japan_x_college/n/dummy3",
      published_at: "2023-03-10",
      people: ["鈴木一郎", "山田太郎"],
      tags: ["AI", "機械学習", "データサイエンス", "リンク:kaggle.com"],
      article_links: [
        { url: "https://kaggle.com/competitions/intro-to-ml", domain: "kaggle.com" },
        { url: "https://tensorflow.org", domain: "tensorflow.org" }
      ],
      sort_index: 3,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92629288/rectangle_large_type_2_98c5e13cd78670fb8b141f0bbb49dfe3.png"
    },
    {
      id: "dummy4",
      title: "サンプル記事4: ビジネスモデルキャンバス入門",
      note_url: "https://note.com/japan_x_college/n/dummy4",
      published_at: "2023-04-05",
      people: ["田中道子"],
      tags: ["ビジネス", "アントレプレナーシップ", "スタートアップ", "リンク:harvard.edu"],
      article_links: [
        { url: "https://hbr.org/business-model-canvas", domain: "hbr.org" }
      ],
      sort_index: 4,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92512445/rectangle_large_type_2_b2b098628f15b59e86c555ef6bb94cbe.png"
    },
    {
      id: "dummy5",
      title: "サンプル記事5: データ分析の実践手法",
      note_url: "https://note.com/japan_x_college/n/dummy5",
      published_at: "2023-05-20",
      people: ["高橋健太", "鈴木一郎"],
      tags: ["データ分析", "統計", "Python", "リンク:tableau.com"],
      article_links: [
        { url: "https://tableau.com/learn/tutorials", domain: "tableau.com" },
        { url: "https://pandas.pydata.org", domain: "pandas.pydata.org" }
      ],
      sort_index: 5,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92428999/rectangle_large_type_2_1f83c14e91ec5f6bcea69b507d8b6b5a.jpeg"
    },
    {
      id: "dummy6",
      title: "サンプル記事6: Webデザインの最新トレンド",
      note_url: "https://note.com/japan_x_college/n/dummy6",
      published_at: "2023-06-15",
      people: ["佐藤花子", "田中道子"],
      tags: ["Web", "デザイン", "UI", "リンク:dribbble.com"],
      article_links: [
        { url: "https://dribbble.com/shots/popular/web-design", domain: "dribbble.com" },
        { url: "https://awwwards.com", domain: "awwwards.com" }
      ],
      sort_index: 6,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92291003/rectangle_large_type_2_fa0264e74a4fde3d84f2c03b7431c4b3.jpeg"
    },
    {
      id: "dummy7",
      title: "サンプル記事7: プロジェクトマネジメントの基本",
      note_url: "https://note.com/japan_x_college/n/dummy7",
      published_at: "2023-07-10",
      people: ["伊藤誠"],
      tags: ["プロジェクト管理", "リーダーシップ", "チームビルディング", "リンク:pmi.org"],
      article_links: [
        { url: "https://pmi.org/learning/library", domain: "pmi.org" }
      ],
      sort_index: 7,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92189384/rectangle_large_type_2_7eebf2ee5a0fda7ec3f75604b1e08edf.png"
    },
    {
      id: "dummy8",
      title: "サンプル記事8: クリエイティブ思考のワークショップ",
      note_url: "https://note.com/japan_x_college/n/dummy8",
      published_at: "2023-08-05",
      people: ["山本さくら", "高橋健太"],
      tags: ["クリエイティブ", "ワークショップ", "アイデア発想", "リンク:ideo.com"],
      article_links: [
        { url: "https://ideo.com/blog/creative-workshops", domain: "ideo.com" }
      ],
      sort_index: 8,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92185993/rectangle_large_type_2_7be6f8f7dd1f0c1c66513f11ed580587.jpeg"
    },
    {
      id: "dummy9",
      title: "サンプル記事9: デジタルマーケティング戦略",
      note_url: "https://note.com/japan_x_college/n/dummy9",
      published_at: "2023-09-20",
      people: ["中村康弘"],
      tags: ["マーケティング", "デジタル", "SNS", "リンク:hubspot.com"],
      article_links: [
        { url: "https://hubspot.com/marketing-resources", domain: "hubspot.com" },
        { url: "https://moz.com/blog", domain: "moz.com" }
      ],
      sort_index: 9,
      eyecatch: "https://assets.st-note.com/production/uploads/images/92077665/rectangle_large_type_2_82a8d905ea8b7ffe4cce4f25927d2c61.png"
    },
    {
      id: "dummy10",
      title: "サンプル記事10: イノベーションと社会変革",
      note_url: "https://note.com/japan_x_college/n/dummy10",
      published_at: "2023-10-15",
      people: ["木村太一", "田中道子", "佐藤花子"],
      tags: ["イノベーション", "社会", "未来予測", "リンク:mit.edu"],
      article_links: [
        { url: "https://mit.edu/innovation-lab", domain: "mit.edu" },
        { url: "https://stanford.edu/social-innovation", domain: "stanford.edu" }
      ],
      sort_index: 10,
      eyecatch: "https://assets.st-note.com/production/uploads/images/91984294/rectangle_large_type_2_a85bd4f2c2880cee83025b44df755066.jpg"
    },
    {
      id: "dummy11",
      title: "サンプル記事11: 効果的なプレゼンテーション技法",
      note_url: "https://note.com/japan_x_college/n/dummy11", 
      published_at: "2023-11-10",
      people: ["小林美咲"],
      tags: ["プレゼンテーション", "コミュニケーション", "話し方", "リンク:ted.com"],
      article_links: [
        { url: "https://ted.com/talks", domain: "ted.com" }
      ],
      sort_index: 11,
      eyecatch: "https://assets.st-note.com/production/uploads/images/91845993/rectangle_large_type_2_67469a7bade63dc3aa1d3b9b8e0bcff7.jpeg"
    },
    {
      id: "dummy12",
      title: "サンプル記事12: 未来の教育とテクノロジー",
      note_url: "https://note.com/japan_x_college/n/dummy12",
      published_at: "2023-12-25",
      people: ["山田太郎", "伊藤誠", "小林美咲"],
      tags: ["教育", "テクノロジー", "EdTech", "リンク:coursera.org"],
      article_links: [
        { url: "https://coursera.org/courses/edtech", domain: "coursera.org" },
        { url: "https://edx.org", domain: "edx.org" }
      ],
      sort_index: 12,
      eyecatch: "https://assets.st-note.com/production/uploads/images/91737495/rectangle_large_type_2_a07da55d0e97a1f48d9f11c6f02ea9b3.png"
    }
  ];
  
  // 1秒の遅延を追加して読み込み状態を確認できるようにする
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(dummyArticles);
} 