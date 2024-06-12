/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'd3je7j5tiq9xzr.cloudfront.net', 'media.winp.io', 'example.com', 'lh3.googleusercontent.com', 'raw.githubusercontent.com', 'nftstorage.link', 'd4f81xqnh94on.cloudfront.net', 'storage.googleapis.com', 'hunt-nft.cdn.boombit.cloud', 'sunflower-land.com'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = {
    experimental: {
        serverActions: true,
    },
    ...nextConfig,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", "supports-color": "supports-color" });

            config.resolve = {
                ...config.resolve,
                fallback: {
                    // fixes proxy-agent dependencies
                    net: false,
                    dns: false,
                    tls: false,
                    assert: false,
                    // fixes next-i18next dependencies
                    path: false,
                    fs: false,
                    // fixes mapbox dependencies
                    events: false,
                    // fixes sentry dependencies
                    process: false
                }
            };
            config.module.exprContextCritical = false;
        }

        return config;
    },
};
