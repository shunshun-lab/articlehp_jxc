export interface Article {
  id: string;
  title: string;
  note_url: string;
  published_at: string;
  people: string[];
  tags: string[];
  article_links: Array<{url: string, domain: string}>;
  sort_index?: number;
  eyecatch?: string | null;
}

export interface ViewConfig {
  id: string;
  name: string;
  viewType: 'table' | 'card' | 'calendar';
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filters: {
    search: string;
    people: string[];
    tags: string[];
  };
  visibleColumns: string[];
} 