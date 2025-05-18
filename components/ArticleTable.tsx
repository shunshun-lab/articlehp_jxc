import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import ArticleLinks from "./ArticleLinks";

interface ArticleTableProps {
  articles: Article[];
  visibleColumns: string[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export default function ArticleTable({
  articles,
  visibleColumns,
  sortBy,
  sortDirection,
  onSortChange,
}: ArticleTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSortIcon = (columnId: string) => {
    if (sortBy !== columnId) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const handleHeaderClick = (columnId: string) => {
    if (sortBy === columnId) {
      onSortChange(columnId, sortDirection === "asc" ? "desc" : "asc");
    } else {
      onSortChange(columnId, "asc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.includes("eyecatch") && (
              <TableHead>
                サムネイル
              </TableHead>
            )}
            {visibleColumns.includes("title") && (
              <TableHead
                className="cursor-pointer"
                onClick={() => handleHeaderClick("title")}
              >
                タイトル {getSortIcon("title")}
              </TableHead>
            )}
            {visibleColumns.includes("published_at") && (
              <TableHead
                className="cursor-pointer"
                onClick={() => handleHeaderClick("published_at")}
              >
                公開日 {getSortIcon("published_at")}
              </TableHead>
            )}
            {visibleColumns.includes("people") && (
              <TableHead>人物</TableHead>
            )}
            {visibleColumns.includes("tags") && (
              <TableHead>タグ</TableHead>
            )}
            {visibleColumns.includes("article_links") && (
              <TableHead>関連リンク</TableHead>
            )}
            {visibleColumns.includes("note_url") && (
              <TableHead>URL</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow 
              key={article.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => window.open(article.note_url, '_blank')}
            >
              {visibleColumns.includes("eyecatch") && (
                <TableCell>
                  {article.eyecatch && (
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img
                        src={article.eyecatch}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </TableCell>
              )}
              {visibleColumns.includes("title") && (
                <TableCell className="font-medium hover:text-blue-600">
                  {article.title}
                </TableCell>
              )}
              {visibleColumns.includes("published_at") && (
                <TableCell>{formatDate(article.published_at)}</TableCell>
              )}
              {visibleColumns.includes("people") && (
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {article.people.map((person) => (
                      <Badge key={person} variant="outline">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              )}
              {visibleColumns.includes("tags") && (
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              )}
              {visibleColumns.includes("article_links") && (
                <TableCell>
                  {article.article_links && article.article_links.length > 0 ? (
                    <ArticleLinks 
                      links={article.article_links} 
                      showAsTable={false} 
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">リンクなし</span>
                  )}
                </TableCell>
              )}
              {visibleColumns.includes("note_url") && (
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    asChild
                    onClick={(e) => {
                      e.stopPropagation(); // テーブル行のクリックイベントを阻止
                    }}
                  >
                    <a
                      href={article.note_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      リンク
                    </a>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
          {articles.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length + (visibleColumns.includes("eyecatch") ? 1 : 0)}
                className="text-center py-8"
              >
                該当する記事がありません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 