import React from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomTextField = ({ name, label, value, onChange, ...props }) => {
    const theme = useTheme();

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
            sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                    },
                },
                '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main,
                },
            }}
            {...props}
        />
    );
};

export default CustomTextField;
