import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // ハイドレーションの操作に関連する実験的機能を有効化
    optimizePackageImports: ['react-dom'],
  },
  // 開発モードでCrossOriginが原因のハイドレーションの問題を修正
  crossOrigin: 'anonymous',
};

export default nextConfig;
