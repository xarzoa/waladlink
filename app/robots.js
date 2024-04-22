export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/dashboard/' },
      { userAgent: '*', disallow: '/dashboard/*' },
      { userAgent: '*', disallow: '/admin/' },
      { userAgent: '*', disallow: '/admin/*' },
      { userAgent: '*', allow: '/*' },
    ],
    sitemap: 'https://walad.link/sitemap.xml',
  };
}
