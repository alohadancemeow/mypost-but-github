/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig