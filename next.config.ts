import type { NextConfig } from "next";

const repo = "figma-mcp-test"; // đổi thành tên repo GitHub của bạn

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "",
  },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
