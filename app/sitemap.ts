import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL - replace with your actual domain
  const baseUrl = 'https://devchihub.com'
  
  // Get current date for lastModified
  const currentDate = new Date()
  
  // Define your routes here - add all important pages of your portfolio
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Add more routes as needed
  ]
}
