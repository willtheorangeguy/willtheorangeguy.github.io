/**
 * API endpoint for fetching Google Maps statistics
 * This can be called during build time to cache fresh stats
 */

import type { APIRoute } from 'astro';
import { fetchGoogleMapsStatsWithScraping } from '@/utils/googleMapsScraper';

export const GET: APIRoute = async ({ url }) => {
  const userId = url.searchParams.get('userId');
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const stats = await fetchGoogleMapsStatsWithScraping(userId);
    
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch Google Maps statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
