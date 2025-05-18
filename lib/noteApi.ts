/**
 * 記事本文から人物とタグとリンクを抽出するユーティリティ関数
 * 
 * @param body 記事本文
 * @param title 記事タイトル
 * @returns 抽出した人物とタグとリンク
 */
export function extractPeopleAndTags(body: string, title: string): { 
  people: string[], 
  tags: string[],
  links: Array<{url: string, domain: string}>
} {
  const people: Set<string> = new Set();
  const tags: Set<string> = new Set();
  const links: Array<{url: string, domain: string}> = [];
  
  // 人物名のパターンを拡張
  
  // 1. 敬称付きの人物名パターン（より多くの敬称をサポート）
  const honorificPattern = /([一-龯ぁ-んァ-ヶ]{2,20})(さん|氏|教授|先生|様|君|教諭|博士|理事|会長|社長|部長|課長|マネージャー)/g;
  const honorificMatches = body.match(honorificPattern) || [];
  
  // 2. インタビュー形式の人物名パターン（「Q: 〇〇さん」などの形式）
  const interviewPattern = /(?:Q:|質問:|インタビュー:|インタビュアー:)\s*([一-龯ぁ-んァ-ヶ]{2,20})/g;
  const interviewMatches = extractRegexGroups(body, interviewPattern, 1) || [];
  
  // 3. 著者や執筆者としての人物名パターン
  const authorPattern = /(?:著者|執筆者|書き手|ライター|講師)(?:は|：|\:)?\s*([一-龯ぁ-んァ-ヶ]{2,20})/g;
  const authorMatches = extractRegexGroups(body, authorPattern, 1) || [];
  
  // 4. 名前の後に所属や職業が続くパターン
  const affiliationPattern = /([一-龯ぁ-んァ-ヶ]{2,20})(?:（|\()([^）\)]*(?:大学|社|会社|研究所|協会|財団|機構)[^）\)]*)(?:）|\))/g;
  const affiliationMatches = extractRegexGroups(body, affiliationPattern, 1) || [];
  
  // 5. 「〜〜と申します」「〜〜です」などの自己紹介パターン
  const selfIntroPattern = /([一-龯ぁ-んァ-ヶ]{2,20})(?:と申します|です。私は|と言います)/g;
  const selfIntroMatches = extractRegexGroups(body, selfIntroPattern, 1) || [];
  
  // 6. タイトルからの人物抽出（より広範なパターン）
  const titlePeoplePattern1 = /([一-龯ぁ-んァ-ヶ]{2,20})(の|が|を|から|と|へ|による|へのインタビュー)/g;
  const titlePeopleMatches1 = extractRegexGroups(title, titlePeoplePattern1, 1) || [];
  
  const titlePeoplePattern2 = /(対談|インタビュー|講演|セミナー|ワークショップ).{0,6}([一-龯ぁ-んァ-ヶ]{2,20})/g;
  const titlePeopleMatches2 = extractRegexGroups(title, titlePeoplePattern2, 2) || [];
  
  // すべてのパターンマッチを処理
  
  // 敬称付きの人物名を処理
  honorificMatches.forEach(match => {
    // 敬称を除去
    const name = match.replace(/(さん|氏|教授|先生|様|君|教諭|博士|理事|会長|社長|部長|課長|マネージャー)$/, '');
    if (isValidPersonName(name)) {
      people.add(name);
    }
  });
  
  // 正規表現グループから抽出した名前を処理
  const allExtractedNames = [
    ...interviewMatches,
    ...authorMatches,
    ...affiliationMatches,
    ...selfIntroMatches,
    ...titlePeopleMatches1,
    ...titlePeopleMatches2
  ];
  
  allExtractedNames.forEach(name => {
    if (isValidPersonName(name)) {
      people.add(name);
    }
  });
  
  // よくあるタグパターン（#タグ や 【カテゴリ】 など）
  const tagPattern1 = /#([一-龯ぁ-んァ-ヶA-Za-z0-9_]{1,20})/g;
  const tagPattern2 = /【([一-龯ぁ-んァ-ヶA-Za-z0-9_]{1,20})】/g;
  
  const tagMatches1 = body.match(tagPattern1) || [];
  const tagMatches2 = body.match(tagPattern2) || [];
  
  // タグを正規化して追加
  tagMatches1.forEach(match => {
    const tag = match.replace(/^#/, '');
    if (tag.length >= 1) {
      tags.add(tag);
    }
  });
  
  tagMatches2.forEach(match => {
    const tag = match.replace(/^【|】$/g, '');
    if (tag.length >= 1) {
      tags.add(tag);
    }
  });
  
  // タイトルからもキーワードを抽出
  const commonKeywords = [
    'プログラミング', 'デザイン', 'ビジネス', '戦略', 'マーケティング',
    '分析', 'データ', '研究', '教育', '開発', 'AI', '人工知能', 'IoT',
    'セミナー', 'ワークショップ', 'イベント', '講座', '入門', '応用'
  ];
  
  commonKeywords.forEach(keyword => {
    if (title.includes(keyword) || body.includes(keyword)) {
      tags.add(keyword);
    }
  });
  
  // 記事中のURLリンクを抽出
  const extractedLinks = extractLinks(body);
  
  // リンク情報をリストに追加
  extractedLinks.forEach(linkInfo => {
    links.push(linkInfo);
    
    // ドメイン名をタグとしても追加
    if (linkInfo.domain) {
      tags.add(`リンク:${linkInfo.domain}`);
    }
  });
  
  // 人物かタグが一つも抽出できない場合は、デフォルト値を設定
  if (people.size === 0) {
    people.add('japan_x_college');
  }
  
  if (tags.size === 0) {
    // タイトルの最初の数文字をタグとして使用
    const defaultTag = title.substring(0, Math.min(10, title.length));
    tags.add(defaultTag);
  }
  
  return {
    people: Array.from(people),
    tags: Array.from(tags),
    links: links
  };
}

/**
 * 記事本文からリンクを抽出する関数
 * 
 * @param body 記事本文
 * @returns リンク情報の配列
 */
export function extractLinks(body: string): Array<{url: string, domain: string}> {
  const links: Array<{url: string, domain: string}> = [];
  const uniqueUrls = new Set<string>();
  
  // 一般的なURLパターン
  const urlPattern = /(https?:\/\/[^\s)"]+)/g;
  const urlMatches = body.match(urlPattern) || [];
  
  // HTML風のリンクパターン（noteの場合）
  const htmlLinkPattern = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/g;
  let htmlLinkMatch;
  
  // HTMLリンクからURLを抽出
  while ((htmlLinkMatch = htmlLinkPattern.exec(body)) !== null) {
    const url = htmlLinkMatch[1];
    if (url && url.startsWith('http') && !uniqueUrls.has(url)) {
      uniqueUrls.add(url);
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        links.push({ url, domain });
      } catch (e) {
        // URLの解析に失敗した場合は無視
      }
    }
  }
  
  // 通常のURLからの抽出
  urlMatches.forEach(url => {
    // 既に抽出済みのURLは除外
    if (!uniqueUrls.has(url)) {
      uniqueUrls.add(url);
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        links.push({ url, domain });
      } catch (e) {
        // URLの解析に失敗した場合は無視
      }
    }
  });
  
  return links;
}

/**
 * 正規表現のグループにマッチする部分を抽出
 */
function extractRegexGroups(text: string, pattern: RegExp, groupIndex: number): string[] {
  const results: string[] = [];
  let match;
  
  while ((match = pattern.exec(text)) !== null) {
    if (match[groupIndex]) {
      results.push(match[groupIndex]);
    }
  }
  
  return results;
}

/**
 * 人物名として有効かどうかを判定
 */
function isValidPersonName(name: string): boolean {
  // 2文字以上20文字以下
  if (name.length < 2 || name.length > 20) {
    return false;
  }
  
  // 明らかに人名でないキーワードを除外
  const nonNameKeywords = [
    '大学', '会社', '企業', '団体', '組織', '協会', 'プロジェクト',
    '日本', '東京', '研究', '調査', '分析', '技術', '開発', '集団',
    'システム', 'アプリ', 'サービス', '製品', '商品', '内容', '全て',
    'すべて', 'ごとに', 'について', 'ものです', 'ための', 'ことが'
  ];
  
  for (const keyword of nonNameKeywords) {
    if (name.includes(keyword)) {
      return false;
    }
  }
  
  return true;
} 