/**
 * Google Maps utilities for fetching user contribution statistics
 */

export interface GoogleMapsStats {
  userId: string;
  totalPoints: number;
  totalViews: number;
  totalPhotos: number;
  totalReviews: number;
  lastUpdated: Date;
}

/**
 * Extract user ID from Google Maps contributor URL
 * @param url - Google Maps contributor URL
 * @returns string - User ID
 */
export function extractUserIdFromUrl(url: string): string {
  // Extract user ID from URL like: https://www.google.com/maps/contrib/100234331600740025841/photos/
  const match = url.match(/\/contrib\/(\d+)/);
  return match ? match[1] : '';
}

/**
 * Format large numbers with appropriate suffixes (K, M, B)
 * @param num - Number to format
 * @returns string - Formatted number
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Get mock/cached Google Maps statistics
 * Since Google Maps doesn't provide a public API for user stats,
 * this function returns manually updated statistics
 * @param userId - Google Maps user ID
 * @returns GoogleMapsStats
 */
function getMockGoogleMapsStats(userId: string): GoogleMapsStats {  
  // Placeholder stats - replace with your actual Google Maps contribution data
  const statsData: Record<string, Partial<GoogleMapsStats>> = {
    '100234331600740025841': {
      totalPoints: 1250, // Update this with your actual points
      totalViews: 25000,  // Update this with your actual photo views
      totalPhotos: 85,    // Update this with your actual photo count
      totalReviews: 42,   // Update this with your actual review count
      lastUpdated: new Date('2025-01-29') // Update this when you update stats
    }
  };

  const userStats = statsData[userId] || {};
  
  return {
    userId,
    totalPoints: userStats.totalPoints || 0,
    totalViews: userStats.totalViews || 0,
    totalPhotos: userStats.totalPhotos || 0,
    totalReviews: userStats.totalReviews || 0,
    lastUpdated: userStats.lastUpdated || new Date()
  };
}

/**
 * Fetch Google Maps user statistics
 * Uses cached data from build-time scraping, with fallback to mock data
 * @param userId - Google Maps user ID
 * @returns Promise<GoogleMapsStats>
 */
export async function fetchGoogleMapsStats(userId: string): Promise<GoogleMapsStats> {
  try {
    // Try to load cached stats first
    try {
      const { getCachedStats } = await import('src/utils/googleMapsCache.js');
      const cachedStats = getCachedStats(userId);
      if (cachedStats) {
        return cachedStats;
      }
    } catch {
      // Cache file doesn't exist or failed to load, continue to scraping
    }

    // Try to use the scraper (only works server-side)
    if (typeof window === 'undefined') {
      // Server-side: use scraper
      const { fetchGoogleMapsStatsWithScraping } = await import('./googleMapsScraper.js');
      return await fetchGoogleMapsStatsWithScraping(userId);
    } else {
      // Client-side: use mock data as last resort
      return getMockGoogleMapsStats(userId);
    }
  } catch {
    // Fallback to mock data if everything fails
    return getMockGoogleMapsStats(userId);
  }
}
