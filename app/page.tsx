"use client";

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import ViewConfigBar from "@/components/ViewConfigBar";
import ArticleTable from "@/components/ArticleTable";
import ArticleCardView from "@/components/ArticleCardView";
import ArticleCalendarView from "@/components/ArticleCalendarView";
import { Article, ViewConfig } from "@/types/article";
import { filterArticles, sortArticles } from "@/lib/articles";
import { toast } from "sonner";

export default function Home() {
  // 基本的な状態
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [viewType, setViewType] = useState<"table" | "card" | "calendar">("table");
  const [sortBy, setSortBy] = useState<string>("published_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "eyecatch",
    "title",
    "published_at",
    "people",
    "tags",
    "article_links",
    "note_url",
  ]);

  // APIからデータをロード
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // APIルートからデータを取得
        const response = await fetch('/api/notes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        setArticles(data);
        toast.success(`${data.length}件の記事を取得しました`);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('実際のAPIからの記事取得に失敗しました。ダミーデータを使用します。');
        toast.error('API接続エラー: ダミーデータを使用します');
        
        // エラー時はダミーデータを使用
        try {
          const dummyResponse = await fetch('/api/notes/dummy');
          if (dummyResponse.ok) {
            const dummyData = await dummyResponse.json();
            setArticles(dummyData);
            toast.success(`${dummyData.length}件のダミー記事を取得しました`);
            setError(null); // エラーをクリア
          } else {
            throw new Error('Failed to fetch dummy data');
          }
        } catch (dummyErr) {
          console.error('Error fetching dummy data:', dummyErr);
          setError('ダミーデータの取得にも失敗しました。');
          setArticles([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  // フィルタリングとソートを適用
  useEffect(() => {
    // フィルタリング
    const filtered = filterArticles(
      articles,
      search,
      selectedPeople,
      selectedTags
    );
    
    // ソート
    const sorted = sortArticles(filtered, sortBy, sortDirection);
    
    setFilteredArticles(sorted);
  }, [articles, search, selectedPeople, selectedTags, sortBy, sortDirection]);

  // ビュータイプの変更ハンドラ
  const handleViewTypeChange = (type: "table" | "card" | "calendar") => {
    setViewType(type);
  };

  // ソート設定の変更ハンドラ
  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortBy(field);
    setSortDirection(direction);
  };

  // 検索条件の変更ハンドラ
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  // 人物フィルタの変更ハンドラ
  const handlePeopleChange = (people: string[]) => {
    setSelectedPeople(people);
  };

  // タグフィルタの変更ハンドラ
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  // 表示カラムの変更ハンドラ
  const handleVisibleColumnsChange = (columns: string[]) => {
    setVisibleColumns(columns);
  };

  // ビュー設定の読み込みハンドラ
  const handleViewConfigLoad = (config: ViewConfig) => {
    setViewType(config.viewType);
    setSortBy(config.sortBy);
    setSortDirection(config.sortDirection);
    setSearch(config.filters.search);
    setSelectedPeople(config.filters.people);
    setSelectedTags(config.filters.tags);
    setVisibleColumns(config.visibleColumns);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">japan_x_college 記事ビューア</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">記事を読み込み中...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <>
            <ViewConfigBar
              articles={articles}
              viewType={viewType}
              sortBy={sortBy}
              sortDirection={sortDirection}
              search={search}
              selectedPeople={selectedPeople}
              selectedTags={selectedTags}
              visibleColumns={visibleColumns}
              onViewTypeChange={handleViewTypeChange}
              onSortChange={handleSortChange}
              onSearchChange={handleSearchChange}
              onPeopleChange={handlePeopleChange}
              onTagsChange={handleTagsChange}
              onVisibleColumnsChange={handleVisibleColumnsChange}
              onViewConfigLoad={handleViewConfigLoad}
            />
            
            <div className="mt-4">
              {viewType === "table" && (
                <ArticleTable
                  articles={filteredArticles}
                  visibleColumns={visibleColumns}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                />
              )}
              
              {viewType === "card" && (
                <ArticleCardView
                  articles={filteredArticles}
                  groupByPeople={true}
                />
              )}
              
              {viewType === "calendar" && (
                <ArticleCalendarView articles={filteredArticles} />
              )}
            </div>
          </>
        )}
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
