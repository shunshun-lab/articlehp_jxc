import fs from 'fs';
import path from 'path';

// キャッシュのインターフェース
interface ApiCache {
  lastUpdated: string; // ISO形式の日付文字列
  data: any; // キャッシュするデータ
}

/**
 * APIキャッシュを管理するクラス
 * 1日に1回のみAPIを呼び出し、それ以外はキャッシュしたデータを返す
 */
export class ApiCacheManager {
  private cacheDir: string;
  private cacheFile: string;

  constructor(cacheName: string) {
    this.cacheDir = path.join(process.cwd(), 'data', 'cache');
    this.cacheFile = path.join(this.cacheDir, `${cacheName}.json`);
    this.ensureCacheDirectory();
  }

  /**
   * キャッシュディレクトリが存在することを確認
   */
  private ensureCacheDirectory() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir);
    }
  }

  /**
   * キャッシュからデータを読み込む
   */
  public getCache(): ApiCache | null {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const cacheData = fs.readFileSync(this.cacheFile, 'utf8');
        return JSON.parse(cacheData) as ApiCache;
      }
    } catch (error) {
      console.error('Error reading cache:', error);
    }
    return null;
  }

  /**
   * キャッシュにデータを保存
   */
  public saveCache(data: any): void {
    try {
      const cache: ApiCache = {
        lastUpdated: new Date().toISOString(),
        data: data
      };
      fs.writeFileSync(this.cacheFile, JSON.stringify(cache, null, 2), 'utf8');
      console.log(`Cache updated: ${this.cacheFile}`);
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  /**
   * キャッシュの更新が必要かどうかを判断
   * 1日以上経過している場合は更新が必要
   */
  public needsUpdate(): boolean {
    const cache = this.getCache();
    if (!cache) {
      return true; // キャッシュがない場合は更新が必要
    }

    const lastUpdated = new Date(cache.lastUpdated);
    const now = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    // 最後の更新から1日以上経過していれば更新が必要
    return now.getTime() - lastUpdated.getTime() > oneDayInMs;
  }
} 