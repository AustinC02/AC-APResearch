const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/***',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.co',
                port: '',
                pathname: '/***',
            }
        ],
    },
};

export default nextConfig;