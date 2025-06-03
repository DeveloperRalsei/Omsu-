import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: [
            "@mantine/core",
            "@mantine/hooks",
            "@mantine/nprogress",
            "@tabler/icons-react",
        ],
        typedEnv: true,
    },
};

const withMDX = createMDX({ extension: /\.(md|mdx)$/ });

export default withMDX(nextConfig);
