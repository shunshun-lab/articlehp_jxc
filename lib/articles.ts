import { Article, ViewConfig } from "@/types/article";

// 記事のフィルタリング関数
export const filterArticles = (
  articles: Article[],
  search: string,
  selectedPeople: string[],
  selectedTags: string[]
): Article[] => {
  return articles.filter((article) => {
    // 検索語句によるフィルタリング
    const searchMatch =
      search === "" ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    // 人物によるフィルタリング
    const peopleMatch =
      selectedPeople.length === 0 ||
      selectedPeople.some((person) => article.people.includes(person));

    // タグによるフィルタリング
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => article.tags.includes(tag));

    return searchMatch && peopleMatch && tagsMatch;
  });
};

// 記事のソート関数
export const sortArticles = (
  articles: Article[],
  sortBy: string,
  sortDirection: "asc" | "desc"
): Article[] => {
  return [...articles].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (sortBy === "published_at") {
      aValue = new Date(a.published_at).getTime();
      bValue = new Date(b.published_at).getTime();
    } else if (sortBy === "title") {
      aValue = a.title;
      bValue = b.title;
    } else if (sortBy === "sort_index") {
      aValue = a.sort_index || Number.MAX_SAFE_INTEGER;
      bValue = b.sort_index || Number.MAX_SAFE_INTEGER;
    } else {
      // デフォルトはID
      aValue = a.id;
      bValue = b.id;
    }

    const compareResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return sortDirection === "asc" ? compareResult : -compareResult;
  });
};

// ユニークな人物リストを取得
export const getUniquePeople = (articles: Article[]): string[] => {
  const peopleSet = new Set<string>();
  articles.forEach((article) => {
    article.people.forEach((person) => {
      peopleSet.add(person);
    });
  });
  return Array.from(peopleSet).sort();
};

// ユニークなタグリストを取得
export const getUniqueTags = (articles: Article[]): string[] => {
  const tagsSet = new Set<string>();
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });
  return Array.from(tagsSet).sort();
};

// ViewConfigをlocalStorageに保存
export const saveViewConfig = (config: ViewConfig): void => {
  try {
    const savedConfigs = getSavedViewConfigs();
    const existingConfigIndex = savedConfigs.findIndex((c) => c.id === config.id);
    
    if (existingConfigIndex !== -1) {
      savedConfigs[existingConfigIndex] = config;
    } else {
      savedConfigs.push(config);
    }
    
    localStorage.setItem("articleViewConfigs", JSON.stringify(savedConfigs));
  } catch (error) {
    console.error("Failed to save view config:", error);
  }
};

// 保存されているViewConfigのリストを取得
export const getSavedViewConfigs = (): ViewConfig[] => {
  try {
    const savedConfigs = localStorage.getItem("articleViewConfigs");
    return savedConfigs ? JSON.parse(savedConfigs) : [];
  } catch (error) {
    console.error("Failed to get saved view configs:", error);
    return [];
  }
};

// 指定されたIDのViewConfigを取得
export const getViewConfigById = (id: string): ViewConfig | null => {
  const configs = getSavedViewConfigs();
  return configs.find((config) => config.id === id) || null;
};

// ViewConfigの削除
export const deleteViewConfig = (id: string): void => {
  try {
    const savedConfigs = getSavedViewConfigs();
    const updatedConfigs = savedConfigs.filter((config) => config.id !== id);
    localStorage.setItem("articleViewConfigs", JSON.stringify(updatedConfigs));
  } catch (error) {
    console.error("Failed to delete view config:", error);
  }
}; 