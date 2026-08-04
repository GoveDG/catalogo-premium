import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGitHubPages ? "/catalogo-premium" : "",
  assetPrefix: isGitHubPages ? "/catalogo-premium/" : "",
  env: { NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/catalogo-premium" : "" },
};

export default nextConfig;
