import { Box, LinearProgress } from '@mui/material';
import React from 'react'

const MultiColorProgressBar = ({ value }) => {

    const greenWidth = Math.min(value, 20); // Green 0-20
    const yellowWidth = Math.min(Math.max(value - 20, 0), 40); // Yellow 21-60
    const redWidth = Math.min(Math.max(value - 60, 0), 40); // Red 61-100



  return (
    <Box position="relative" width="100%" height={10}>
        {/* Green Progress */}
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          position: 'absolute',
          width: `${greenWidth}%`,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': { backgroundColor: 'green' },
        }}
      />
      {/* Yellow Progress */}
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          position: 'absolute',
          width: `${yellowWidth}%`,
          left: `${greenWidth}%`,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': { backgroundColor: 'yellow' },
        }}
      />
      {/* Red Progress */}
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          position: 'absolute',
          width: `${redWidth}%`,
          left: `${greenWidth + yellowWidth}%`,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': { backgroundColor: 'red' },
        }}
      />
    </Box>
  )
}

export default MultiColorProgressBar
