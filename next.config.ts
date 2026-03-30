import type { NextConfig } from "next";
import path from "node:path";
const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  ""
);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: configuredBasePath,
  },
  basePath: configuredBasePath || undefined,
  assetPrefix: configuredBasePath ? `${configuredBasePath}/` : undefined,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
