/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 本番ビルド時にESLintのチェックをスキップ
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 本番ビルド時にTypeScriptのチェックをスキップ
    ignoreBuildErrors: true,
  },
  // キャッシュファイルのパスを環境に応じて変更
  env: {
    CACHE_PATH: process.env.NODE_ENV === 'production' 
      ? '/tmp/cache' 
      : './data/cache',
  },
};

export default nextConfig;
