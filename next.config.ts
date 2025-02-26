import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  // 如果是允许加载远程文件类型（如视频、音频），你可能还需要修改其他配置
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|mp3|ogg|webm|wav)$/, // 你需要处理的文件类型
      use: [
        {
          loader: 'file-loader', // 用于处理文件的加载器
          options: {
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
