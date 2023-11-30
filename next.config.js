/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'images.unsplash.com',
            'firebasestorage.googleapis.com'
        ]
    }
}

module.exports = nextConfig
