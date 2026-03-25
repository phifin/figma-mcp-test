import type { NextConfig } from "next";
import path from "node:path";
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
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
