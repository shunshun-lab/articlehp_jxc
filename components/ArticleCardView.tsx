import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import Image from "next/image";
import ArticleLinks from "./ArticleLinks";

interface ArticleCardViewProps {
  articles: Article[];
  groupByPeople: boolean;
}

export default function ArticleCardView({
  articles,
  groupByPeople = true,
}: ArticleCardViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (groupByPeople) {
    // 人物ごとにグループ化
    const peopleMap = new Map<string, Article[]>();
    
    // 各記事の各人物に対してマップに追加
    articles.forEach((article) => {
      article.people.forEach((person) => {
        if (!peopleMap.has(person)) {
          peopleMap.set(person, []);
        }
        peopleMap.get(person)!.push(article);
      });
    });

    // 人物ごとのセクションを作成
    return (
      <div className="space-y-8">
        {Array.from(peopleMap.entries()).map(([person, personArticles]) => (
          <div key={person} className="space-y-4">
            <h2 className="text-2xl font-bold">{person}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {personArticles.map((article) => (
                <ArticleCard key={`${person}-${article.id}`} article={article} />
              ))}
            </div>
          </div>
        ))}
        {Array.from(peopleMap.entries()).length === 0 && (
          <div className="text-center py-8">
            該当する記事がありません
          </div>
        )}
      </div>
    );
  } else {
    // グループ化せずに表示
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {articles.length === 0 && (
          <div className="col-span-full text-center py-8">
            該当する記事がありません
          </div>
        )}
      </div>
    );
  }
}

// 個別の記事カードコンポーネント
function ArticleCard({ article }: { article: Article }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // サムネイル部分
  const renderThumbnail = () => {
    if (article.eyecatch) {
      return (
        <div className="w-full h-40 overflow-hidden rounded-t-lg mb-2 relative">
          <img
            src={article.eyecatch}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {/* カードは複数の要素に分けてリンクを設置する */}
      <a
        href={article.note_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {renderThumbnail()}
      </a>

      <CardHeader className="pb-2">
        <a
          href={article.note_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </CardTitle>
        </a>
      </CardHeader>

      <CardContent className="flex-grow pb-2">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {article.people.map((person) => (
              <Badge key={person} variant="outline">
                {person}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          {article.article_links && article.article_links.length > 0 && (
            <div className="mt-2">
              <h4 className="text-xs text-gray-500 mb-1">関連リンク</h4>
              <ArticleLinks links={article.article_links} />
            </div>
          )}
          <div className="text-sm text-gray-500">
            公開日: {formatDate(article.published_at)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="secondary" className="w-full" asChild>
          <a href={article.note_url} target="_blank" rel="noopener noreferrer">
            記事を見る
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}