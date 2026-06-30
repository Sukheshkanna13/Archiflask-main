import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://www.archiflask.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/impact', '/blog', '/book-demo', '/get-started']
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date('2026-06-24T00:00:00.000Z'),
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
