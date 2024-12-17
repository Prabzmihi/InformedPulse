import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react'

const MultiColorProgressBar = ({ value }) => {

  const barColor = value <= 20 ? 'low' : 20 < value && value <= 60 ? 'moderate' : 'high';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent:'center' }}>
      <Box sx={{ width: '50%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} color={barColor} sx={{
            height: 7,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor,
            },
            backgroundColor: '#F3F3F3', // Default track color
          }} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export default MultiColorProgressBar
