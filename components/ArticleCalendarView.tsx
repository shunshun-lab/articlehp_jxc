import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";
import { Article } from "@/types/article";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArticleLinks from "./ArticleLinks";

interface ArticleCalendarViewProps {
  articles: Article[];
}

export default function ArticleCalendarView({
  articles,
}: ArticleCalendarViewProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // カレンダー用のイベントデータを作成
  const events = articles.map((article) => {
    return {
      id: article.id,
      title: article.title,
      start: article.published_at,
      article,
    };
  });

  const handleEventClick = (info: any) => {
    setSelectedArticle(info.event.extendedProps.article);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-2">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
        locales={[jaLocale]}
        locale="ja"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
      />

      {/* 記事詳細ダイアログ */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {selectedArticle.eyecatch && (
                  <div className="w-full max-h-60 overflow-hidden rounded-md">
                    <img
                      src={selectedArticle.eyecatch}
                      alt={selectedArticle.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium mb-1">公開日</h4>
                  <p>{formatDate(selectedArticle.published_at)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">人物</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedArticle.people.map((person) => (
                      <Badge key={person} variant="outline">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">タグ</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedArticle.article_links && selectedArticle.article_links.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">関連リンク</h4>
                    <ArticleLinks links={selectedArticle.article_links} showAsTable={true} />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button asChild>
                  <a
                    href={selectedArticle.note_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    記事を見る
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 