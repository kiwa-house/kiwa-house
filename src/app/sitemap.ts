import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://suzhouhousing.jp';
  
  const locales = ['ja', 'zh', 'en'];
  const pages = ['', '/properties', '/services', '/about', '/contact'];
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  locales.forEach(locale => {
    pages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });
  
  return sitemap;
}
