import React, { useState, useEffect } from 'react';
import { fetchUnsplashStats, formatNumber, type UnsplashStats } from '@/utils/unsplash';

interface UnsplashStatsCardProps {
  username: string;
  accessKey?: string;
}

export const UnsplashStatsCard: React.FC<UnsplashStatsCardProps> = ({ 
  username, 
  accessKey 
}) => {
  const [stats, setStats] = useState<UnsplashStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const unsplashStats = await fetchUnsplashStats(username, accessKey);
        setStats(unsplashStats);
      } catch {
        setError('Failed to load Unsplash stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [username, accessKey]);

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
          <h2 className="text-lg text-skin-accent font-medium decoration-dashed hover:underline" style={{color: 'var(--accent)'}}>Unsplash Stats</h2>
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
          <h2 className="text-lg text-skin-accent font-medium decoration-dashed hover:underline" style={{color: 'var(--accent)'}}>Unsplash Stats</h2>
          <p>{error || 'Unable to load stats'}</p>
          <p>
            <a 
              href={`https://unsplash.com/@${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-skin-accent hover:underline"
            >
              View on Unsplash →
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <a 
      href={stats.portfolioUrl} 
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
          Unsplash Stats
        </h2>
        <p>
          <strong>{stats.totalPhotos}</strong> photos with <strong>{formatNumber(stats.totalViews)}</strong> views 
          and <strong>{formatNumber(stats.totalDownloads)}</strong> downloads.
        </p>
        <p>
          <strong>{stats.totalLikes}</strong> likes • <strong>{stats.followers}</strong> followers
        </p>
      </div>
    </a>
  );
};
