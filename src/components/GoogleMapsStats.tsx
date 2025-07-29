import React, { useState, useEffect } from 'react';
import { fetchGoogleMapsStats, formatNumber, extractUserIdFromUrl, type GoogleMapsStats } from '@/utils/googleMaps';

interface GoogleMapsStatsCardProps {
  profileUrl: string;
}

export const GoogleMapsStatsCard: React.FC<GoogleMapsStatsCardProps> = ({ 
  profileUrl 
}) => {
  const [stats, setStats] = useState<GoogleMapsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = extractUserIdFromUrl(profileUrl);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const mapsStats = await fetchGoogleMapsStats(userId);
        setStats(mapsStats);
      } catch {
        setError('Failed to load Google Maps stats');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadStats();
    } else {
      setError('Invalid Google Maps profile URL');
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div 
        className="card border-skin-line"
        style={{
          display: 'block',
          padding: '16px',
          textDecoration: 'none',
          color: 'inherit',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
      >
        <div className="card-content">
          <h2 className="text-lg text-skin-accent font-medium decoration-dashed hover:underline" style={{color: 'var(--accent)'}}>Google Maps Stats</h2>
          <p>Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div 
        className="card border-skin-line"
        style={{
          display: 'block',
          padding: '16px',
          textDecoration: 'none',
          color: 'inherit',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
      >
        <div className="card-content">
          <h2 className="text-lg text-skin-accent font-medium decoration-dashed hover:underline" style={{color: 'var(--accent)'}}>Google Maps Stats</h2>
          <p>{error || 'Unable to load stats'}</p>
          <p>
            <a 
              href={profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-skin-accent hover:underline"
            >
              View on Google Maps →
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <a 
      href={profileUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="card border-skin-line"
      style={{
        display: 'block',
        padding: '16px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="card-content">
        <h2 className="text-lg text-skin-accent font-medium decoration-dashed hover:underline" style={{color: 'var(--accent)'}}>
          Google Maps Stats
        </h2>
        <p>
          <strong>{formatNumber(stats.totalPoints)}</strong> points • <strong>{formatNumber(stats.totalViews)}</strong> views
        </p>
        <p>
          <strong>{stats.totalPhotos}</strong> photos • <strong>{stats.totalReviews}</strong> reviews
        </p>
      </div>
    </a>
  );
};
