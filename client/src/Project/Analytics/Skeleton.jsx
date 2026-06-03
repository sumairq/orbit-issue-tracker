import React from 'react';

import { StatRow, ChartsGrid, SkeletonCard, Skeleton } from './Styles';

/**
 * Responsive shimmer skeleton that mirrors the real dashboard layout (stat-card
 * row + charts grid) so the page doesn't flash blank while data loads.
 */
const AnalyticsSkeleton = () => (
  <>
    <StatRow>
      {['s1', 's2', 's3', 's4', 's5'].map(key => (
        <SkeletonCard key={key}>
          <Skeleton width="60%" height={12} />
          <div style={{ height: 16 }} />
          <Skeleton width="40%" height={28} />
        </SkeletonCard>
      ))}
    </StatRow>
    <ChartsGrid>
      {['c1', 'c2', 'c3'].map(key => (
        <SkeletonCard key={key}>
          <Skeleton width="45%" height={14} />
          <div style={{ height: 20 }} />
          <Skeleton height={220} radius="8px" />
        </SkeletonCard>
      ))}
    </ChartsGrid>
  </>
);

export default AnalyticsSkeleton;
