'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Divider, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
// import { useAuth } from '../context/AuthContext'; 
import { keyframes } from '@mui/system';


const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DrawerComponent = ({ open, onClose }) => {
    const theme = useTheme();
    const user = { role: 'client' }
    const router = useRouter();


    const navigationItems = user?.role === 'admin'
        ? ['Product Category List', 'Product List', 'Users List']
        : ['Products List', 'Cart', 'Profile'];

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.drawer.paperBackground,
                    color: theme.palette.drawer.color,
                    width: theme.spacing(30), // 240px
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    position: 'relative',

                },
            }}
        >
            <div
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
                style={{ paddingTop: theme.spacing(2) }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: theme.spacing(4.2),
                        right: theme.spacing(2.5),
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            animation: `${bounce} 0.5s ease`,
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        padding: theme.spacing(2),
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Navigation
                </Typography>
                <Divider />
                <List sx={{ padding: 0 }}>
                    {navigationItems.map((text) => (
                        <ListItem
                            
                            key={text}
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                  backgroundColor: theme.palette.primary.light,
                                  transform: 'scale(1.07)', 
                                  transition: 'transform 0.8s ease-in-out', 
                                },
                                transition: 'background-color 0.3s ease-in-out', 
                              }}
                            onClick={() => router.push(`/${text.replace(/\s+/g, '-').toLowerCase()}`)}>
                            <ListItemText
                                primary={text}
                                sx={{
                                    fontWeight: 'bold',
                                    color: theme.palette.text.primary,
                                }} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

export default DrawerComponent;
