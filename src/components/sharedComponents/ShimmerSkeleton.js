import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const ShimmerSkeleton = ({ width, height }) => (
  <Box
    sx={{
      width: width || '100%',
      height: height || '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: 1,
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: `${shimmer} 1.5s infinite`,
    }}
  />
);

export default ShimmerSkeleton;
