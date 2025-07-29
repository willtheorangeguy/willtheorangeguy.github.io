/**
 * Server-side Google Maps scraper for fetching user contribution statistics
 * This runs during build time to fetch fresh stats
 */

import type { GoogleMapsStats } from './googleMaps.js';

interface ScrapedStats {
  points?: number;
  photos?: number;
  photoViews?: number;
  reviews?: number;
}

/**
 * Scrape Google Maps profile page for user statistics
 * This function attempts to extract stats from the HTML content
 * @param userId - Google Maps user ID
 * @returns Promise<ScrapedStats>
 */
async function scrapeGoogleMapsProfile(userId: string): Promise<ScrapedStats> {
  const profileUrl = `https://www.google.com/maps/contrib/${userId}/photos/`;
  
  try {
    // Use a user agent that mimics a real browser
    const response = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse the HTML to extract stats
    const stats = parseGoogleMapsHTML(html);
    return stats;
    
  } catch (error) {
    throw error;
  }
}

/**
 * Parse Google Maps HTML to extract user statistics
 * @param html - HTML content from Google Maps profile page
 * @returns ScrapedStats
 */
function parseGoogleMapsHTML(html: string): ScrapedStats {
  const stats: ScrapedStats = {};
  
  try {
    // Google Maps uses various patterns for displaying stats
    // These patterns may change over time and need to be updated
    
    // Look for points (Local Guide level/points)
    const pointsPatterns = [
      /(\d{1,3}(?:,\d{3})*)\s*points/i,
      /(\d{1,3}(?:,\d{3})*)\s*point/i,
      /"localGuideLevel":\s*(\d+)/i,
      /Level\s*(\d+)/i
    ];
    
    for (const pattern of pointsPatterns) {
      const match = html.match(pattern);
      if (match) {
        stats.points = parseInt(match[1].replace(/,/g, ''));
        break;
      }
    }
    
    // Look for photo count
    const photoPatterns = [
      /(\d{1,3}(?:,\d{3})*)\s*photos/i,
      /(\d{1,3}(?:,\d{3})*)\s*photo/i,
      /"photoCount":\s*(\d+)/i
    ];
    
    for (const pattern of photoPatterns) {
      const match = html.match(pattern);
      if (match) {
        stats.photos = parseInt(match[1].replace(/,/g, ''));
        break;
      }
    }
    
    // Look for photo views
    const viewPatterns = [
      /(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KMB]?)\s*views/i,
      /(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KMB]?)\s*view/i,
      /"viewCount":\s*(\d+)/i
    ];
    
    for (const pattern of viewPatterns) {
      const match = html.match(pattern);
      if (match) {
        stats.photoViews = parseNumberWithSuffix(match[1]);
        break;
      }
    }
    
    // Look for review count
    const reviewPatterns = [
      /(\d{1,3}(?:,\d{3})*)\s*reviews/i,
      /(\d{1,3}(?:,\d{3})*)\s*review/i,
      /"reviewCount":\s*(\d+)/i
    ];
    
    for (const pattern of reviewPatterns) {
      const match = html.match(pattern);
      if (match) {
        stats.reviews = parseInt(match[1].replace(/,/g, ''));
        break;
      }
    }
    
    // Alternative: Look for JSON data embedded in the page
    const jsonMatch = html.match(/window\.APP_INITIALIZATION_STATE\s*=\s*(\[.*?\]);/);
    if (jsonMatch) {
      try {
        const appState = JSON.parse(jsonMatch[1]);
        // Navigate through the nested structure to find user stats
        // This is very fragile and may break when Google updates their structure
        const userData = extractUserDataFromAppState(appState);
        if (userData) {
          Object.assign(stats, userData);
        }
      } catch {
        // Ignore JSON parsing errors and fall back to regex parsing
      }
    }
    
  } catch {
    // Ignore parsing errors
  }
  
  return stats;
}

/**
 * Parse numbers with K, M, B suffixes
 * @param numStr - Number string like "1.2K", "3.4M", "5.6B"
 * @returns number
 */
function parseNumberWithSuffix(numStr: string): number {
  const cleanNum = numStr.replace(/,/g, '');
  const match = cleanNum.match(/^(\d+(?:\.\d+)?)\s*([KMB]?)$/i);
  
  if (!match) {
    return parseInt(cleanNum) || 0;
  }
  
  const num = parseFloat(match[1]);
  const suffix = match[2].toUpperCase();
  
  switch (suffix) {
    case 'K': return Math.round(num * 1000);
    case 'M': return Math.round(num * 1000000);
    case 'B': return Math.round(num * 1000000000);
    default: return Math.round(num);
  }
}

/**
 * Extract user data from Google's APP_INITIALIZATION_STATE
 * This is highly experimental and may break frequently
 * @param appState - Parsed APP_INITIALIZATION_STATE array
 * @returns ScrapedStats | null
 */
function extractUserDataFromAppState(appState: unknown[]): ScrapedStats | null {
  try {
    // This is a very fragile approach that navigates Google's internal data structure
    // The structure changes frequently, so this is just a best-effort attempt
    
    // Look for user profile data in the nested arrays
    function searchForUserData(obj: unknown): ScrapedStats | null {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          const result = searchForUserData(item);
          if (result) return result;
        }
      } else if (obj && typeof obj === 'object') {
        const objTyped = obj as Record<string, unknown>;
        // Look for properties that might contain user stats
        if (objTyped.localGuideLevel !== undefined || objTyped.contributorLevel !== undefined) {
          return {
            points: Number(objTyped.localGuideLevel || objTyped.contributorLevel) || 0,
            photos: Number(objTyped.photoCount) || 0,
            photoViews: Number(objTyped.photoViews || objTyped.viewCount) || 0,
            reviews: Number(objTyped.reviewCount) || 0
          };
        }
        
        // Recursively search nested objects
        for (const key in objTyped) {
          const result = searchForUserData(objTyped[key]);
          if (result) return result;
        }
      }
      return null;
    }
    
    return searchForUserData(appState);
  } catch {
    return null;
  }
}

/**
 * Cache scraped stats to avoid rate limiting
 */
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const statsCache = new Map<string, { stats: GoogleMapsStats; timestamp: number }>();

/**
 * Fetch Google Maps statistics with caching
 * @param userId - Google Maps user ID
 * @returns Promise<GoogleMapsStats>
 */
export async function fetchGoogleMapsStatsWithScraping(userId: string): Promise<GoogleMapsStats> {
  // Check cache first
  const cached = statsCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.stats;
  }
  
  try {
    const scrapedStats = await scrapeGoogleMapsProfile(userId);
    
    const stats: GoogleMapsStats = {
      userId,
      totalPoints: scrapedStats.points || 0,
      totalViews: scrapedStats.photoViews || 0,
      totalPhotos: scrapedStats.photos || 0,
      totalReviews: scrapedStats.reviews || 0,
      lastUpdated: new Date()
    };
    
    // Cache the results
    statsCache.set(userId, { stats, timestamp: Date.now() });
    
    return stats;
    
  } catch {
    // If scraping fails, return cached data if available, otherwise mock data
    if (cached) {
      return cached.stats;
    }
    
    // Fallback to mock data
    return {
      userId,
      totalPoints: 0,
      totalViews: 0,
      totalPhotos: 0,
      totalReviews: 0,
      lastUpdated: new Date()
    };
  }
}
