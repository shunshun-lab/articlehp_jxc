const fs = require('fs');
const path = require('path');
// node-fetchのインポート方法を修正
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// ページごとにデータを取得する関数
async function fetchPageData(page) {
  try {
    console.log(`Fetching page ${page} from note API...`);
    // note.comの公式APIを使用
    const response = await fetch(`https://note.com/api/v2/creators/japan_x_college/contents?kind=note&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching page ${page}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // note.comのAPI構造に合わせて調整
    if (data && data.data && data.data.contents) {
      const contents = data.data.contents;
      const isLastPage = data.data.isLastPage;
      
      console.log(`Fetched ${contents.length} articles from page ${page}. isLastPage: ${isLastPage}`);
      
      return {
        contents: contents,
        isLastPage: isLastPage
      };
    } else {
      console.error('Unexpected API response format:', data);
      return { contents: [], isLastPage: true };
    }
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    return { contents: [], isLastPage: true }; // エラー時は処理を終了するために最終ページとして扱う
  }
}

// note.comのレスポンスからArticle型への変換
function convertToArticles(contents) {
  return contents.map((content, index) => {
    // タグを抽出（#記号を取り除く）
    const tags = content.hashtags ? content.hashtags.map(tag => tag.hashtag.name.replace(/^#/, '')) : [];
    
    // タイトルと説明文から人物名を抽出（より強化）
    const people = extractPeopleFromContent(content.name, content.body || '');
    
    // 記事リンク（実際のデータでは空配列）
    const article_links = [];
    
    return {
      id: String(content.id),
      title: content.name,
      note_url: content.noteUrl,
      published_at: content.publishAt,
      people: people,
      tags: tags,
      article_links: article_links,
      sort_index: index + 1,
      eyecatch: content.eyecatch
    };
  });
}

// タイトルと本文から人物名を抽出する関数（強化版）
function extractPeopleFromContent(title, body) {
  const people = [];
  const combinedText = `${title} ${body}`;
  
  // 特定の人物リスト
  const knownPeople = [
    'ぐみ沢エイ子', '加藤憧', '武井佑太', '田口響生', '秀島ちえこ', 
    '石田諭基', '内芝弘尭', 'tsuruken', '松岡直哉', '北浦優翔',
    '谷村朱門', '生島渓月', '白圡雄一郎', '藤原麻美子'
  ];
  
  // ver表記を削除して名前を抽出するヘルパー関数
  const cleanVersionFromTitle = (text) => {
    return text.replace(/v\d+(-\d+)?/, '').trim();
  };
  
  // 【】内のテキストを抽出
  const bracketMatch = title.match(/【(.+?)】/);
  if (bracketMatch) {
    const bracketContent = bracketMatch[1];
    
    // 【〇〇インタビュー】というパターンを検出
    if (bracketContent.includes('インタビュー')) {
      const intervieweeName = cleanVersionFromTitle(title)
        .replace(/【.+?】/, '')
        .replace(/インタビュー.*$/, '')
        .replace(/さん.*$/, '')
        .trim();
      
      if (intervieweeName && intervieweeName.length > 1) {
        people.push(intervieweeName);
      }
    }
  }
  
  // 既知の人物名をチェック
  for (const person of knownPeople) {
    if (combinedText.includes(person)) {
      people.push(person);
    }
  }
  
  // 特殊なケース：対談やインタビュー記事
  if (title.includes('対談') || title.includes('インタビュー')) {
    // 既に人物を抽出済みの場合はスキップ
    if (people.length === 0) {
      // タイトルから名前のパターンを探す（「〇〇さん」や「〇〇氏」など）
      const nameMatches = combinedText.match(/([^\s　]{2,10})(さん|氏)/g);
      if (nameMatches) {
        nameMatches.forEach(match => {
          const name = match.replace(/(さん|氏)$/, '').trim();
          if (name && name.length > 1 && !people.includes(name)) {
            people.push(name);
          }
        });
      }
    }
  }
  
  // もし人物が特定できなかった場合の処理
  if (people.length === 0) {
    // ニューシンキングまたは小論文を含む場合のみjapan_x_collegeを追加
    if (title.includes('ニューシンキング') || title.includes('小論文')) {
      people.push('japan_x_college');
    } else {
      // それ以外の場合は、タイトルから最も可能性の高い人物を推測
      const cleanTitle = cleanVersionFromTitle(title);
      
      // 「〇〇の〇〇」というパターンがあるか確認
      const possibleName = cleanTitle.match(/([^\s　]{2,10})の/);
      if (possibleName && possibleName[1].length > 1) {
        people.push(possibleName[1]);
      }
      // それでも見つからない場合は未分類としてタグなしにする
    }
  }
  
  return people;
}

// 全ページのデータを取得する関数
async function fetchAllArticles() {
  let page = 1;
  let isLastPage = false;
  let allContents = [];
  
  // 最終ページに到達するまでデータを取得し続ける
  while (!isLastPage) {
    const pageData = await fetchPageData(page);
    allContents = [...allContents, ...pageData.contents];
    isLastPage = pageData.isLastPage;
    
    if (!isLastPage) {
      page++;
    }
  }
  
  console.log(`Total articles fetched: ${allContents.length}`);
  return allContents;
}

// データを取得して保存する関数
async function updateCache() {
  try {
    console.log('Starting to fetch all note articles...');
    
    // 全ページのデータを取得
    const allContents = await fetchAllArticles();
    
    // 記事データをArticle型に変換
    const articles = convertToArticles(allContents);
    
    // 人物タグが空の記事数をカウント
    const noPersonCount = articles.filter(article => article.people.length === 0).length;
    console.log(`記事数: ${articles.length}, 人物タグなし: ${noPersonCount}`);
    
    // キャッシュデータの作成
    const cacheData = {
      timestamp: Date.now(),
      data: articles
    };
    
    // キャッシュディレクトリのパス
    const cacheDir = path.join(__dirname, 'data', 'cache');
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
      console.log(`キャッシュディレクトリを作成しました: ${cacheDir}`);
    }
    
    // キャッシュファイルのパス
    const cachePath = path.join(cacheDir, 'notes.json');
    
    // キャッシュファイルの保存
    fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
    console.log(`キャッシュファイルを更新しました: ${cachePath}`);
    console.log(`合計 ${articles.length} 記事のデータをキャッシュに保存しました。`);
  } catch (error) {
    console.error('Error updating cache:', error);
  }
}

// 実行
updateCache(); 