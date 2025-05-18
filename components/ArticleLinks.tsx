import React from 'react';
import { Badge } from './ui/badge';

interface ArticleLinksProps {
  links: Array<{url: string, domain: string}>;
  showAsTable?: boolean;
}

/**
 * 記事内のリンクをリストまたはテーブルとして表示するコンポーネント
 */
export default function ArticleLinks({ links, showAsTable = false }: ArticleLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  // リンクをテーブル形式で表示
  if (showAsTable) {
    return (
      <div className="my-2 w-full overflow-auto">
        <table className="w-full min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">ドメイン</th>
              <th className="py-2 text-left font-medium">URL</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={index} className="border-b hover:bg-muted/50">
                <td className="py-2">{link.domain}</td>
                <td className="py-2">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {truncateUrl(link.url)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // リンクをバッジリスト形式で表示
  return (
    <div className="flex flex-wrap gap-2 my-2">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Badge 
            variant="outline" 
            className="hover:bg-blue-100 cursor-pointer flex items-center gap-1"
          >
            <span className="font-bold">{link.domain}</span>
            <span>→</span>
          </Badge>
        </a>
      ))}
    </div>
  );
}

/**
 * 長いURLを省略表示する
 */
function truncateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    if (path.length > 30) {
      return `${urlObj.origin}${path.substring(0, 20)}...${path.slice(-10)}`;
    }
    return `${urlObj.origin}${path}`;
  } catch (e) {
    if (url.length > 40) {
      return url.substring(0, 37) + '...';
    }
    return url;
  }
} 