import { NextResponse } from 'next/server';
import { Article } from '@/types/article';
import { extractPeopleAndTags } from '@/lib/noteApi';
import { ApiCacheManager } from '@/lib/apiCache';
import fs from 'fs';
import path from 'path';

// noteの記事データ型定義（APIレスポンス用）
interface NoteApiResponse {
  data: {
    contents: NoteContent[];
    isLastPage: boolean;
  };
}

interface NoteContent {
  id: string;
  name: string;
  body: string;
  eyecatch: string | null;
  publish_at: string;
  status: string;
  url: string;
  user: {
    id: string;
    name: string;
    urlname: string;
  };
}

// 手動タグのインターフェース
interface ManualTags {
  [articleId: string]: {
    people?: string[];
    tags?: string[];
  };
}

/**
 * japan_x_collegeアカウントの全記事を取得するAPI
 * 1日に1回だけデータを更新し、それ以外はキャッシュを使用
 */
export async function GET() {
  try {
    // APIキャッシュマネージャーの初期化
    const cacheManager = new ApiCacheManager('notes');
    let articles: Article[] = [];
    
    // キャッシュの更新が必要かどうかを確認
    if (cacheManager.needsUpdate()) {
      console.log('Cache update needed, fetching fresh data from note API...');
      // 新しいデータを取得
      const allNotes = await fetchAllNotes();
      
      // 手動タグの読み込み
      const manualTags = loadManualTags();
      
      // 取得した記事を変換・加工
      articles = processNotes(allNotes, manualTags);
      
      // キャッシュに保存
      cacheManager.saveCache(articles);
    } else {
      // キャッシュからデータを読み込む
      console.log('Using cached data...');
      const cache = cacheManager.getCache();
      if (cache && cache.data) {
        articles = cache.data;
      } else {
        // キャッシュが壊れている場合は新しいデータを取得
        console.log('Cache corrupted, fetching fresh data...');
        const allNotes = await fetchAllNotes();
        const manualTags = loadManualTags();
        articles = processNotes(allNotes, manualTags);
        cacheManager.saveCache(articles);
      }
    }
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in notes API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

/**
 * 手動タグを読み込む
 */
function loadManualTags(): ManualTags {
  let manualTags: ManualTags = {};
  const manualTagsPath = path.join(process.cwd(), 'data', 'manual_tags.json');
  
  try {
    if (fs.existsSync(manualTagsPath)) {
      const manualTagsData = fs.readFileSync(manualTagsPath, 'utf8');
      manualTags = JSON.parse(manualTagsData);
    }
  } catch (err) {
    console.error('Error loading manual tags:', err);
  }
  
  return manualTags;
}

/**
 * 取得したnoteデータを処理して記事オブジェクトに変換
 */
function processNotes(notes: NoteContent[], manualTags: ManualTags): Article[] {
  return notes.map((note, index) => {
    // 記事本文から人物とタグとリンクを抽出
    const { people, tags, links } = extractPeopleAndTags(note.body, note.name);
    
    // 手動タグがあれば優先
    const manualTagsForArticle = manualTags[note.id] || {};
    
    return {
      id: note.id,
      title: note.name,
      note_url: note.url,
      published_at: note.publish_at,
      people: manualTagsForArticle.people || people,
      tags: manualTagsForArticle.tags || tags,
      article_links: links,
      sort_index: index + 1,
      eyecatch: note.eyecatch,
    };
  });
}

/**
 * 全ページの記事を取得して結合する
 */
async function fetchAllNotes(): Promise<NoteContent[]> {
  const allNotes: NoteContent[] = [];
  let page = 1;
  let isLastPage = false;
  
  // 最大ページ数の制限（無限ループ防止）
  const MAX_PAGES = 20;
  
  // 全ページを取得するまでループ
  while (!isLastPage && page <= MAX_PAGES) {
    // APIエンドポイント
    const url = `https://note.com/api/v2/creators/japan_x_college/contents?kind=note&page=${page}`;
    
    try {
      console.log(`Fetching page ${page} from note API...`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; ArticleViewer/1.0)',
          'Accept': 'application/json',
        },
        cache: 'no-store', // 常に最新データを取得
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch notes from page ${page}: ${response.status}`);
      }
      
      const data: NoteApiResponse = await response.json();
      
      // 取得した記事を追加
      allNotes.push(...data.data.contents);
      
      // 最後のページならループを終了
      isLastPage = data.data.isLastPage;
      console.log(`Fetched ${data.data.contents.length} articles from page ${page}. isLastPage: ${isLastPage}`);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      // エラーでループを終了し、これまでに取得したものだけを返す
      break;
    }
    
    // 次のページへ
    page++;
    
    // APIリクエストの間隔を開ける（レート制限対策）
    if (!isLastPage) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
    }
  }
  
  console.log(`Total articles fetched: ${allNotes.length}`);
  return allNotes;
} 