import type { NextConfig } from "next";
import withPayload from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withPayload(nextConfig);
