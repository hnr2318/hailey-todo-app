import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

export default function CircularProgressWithLabel(props) {
    const [percent, setPercent] = useState(0)
    const {late, ...rest} = props
    const textColor = late ? 'red' : 'rgba(0, 0, 0, 0.6)'
    useEffect(() => {
        setPercent(props.value)
    },[])

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', marginRight: "1rem" }}>
            <CircularProgress variant="determinate" {...rest} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" style={{color: textColor}}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};
