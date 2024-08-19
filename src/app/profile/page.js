'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('https://dummyjson.com/user/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else if (response.status === 401) {
                    // Unauthorized, token might be expired or invalid
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    router.push('/login');
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('An error occurred while fetching your profile.');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, textAlign: 'center' }}>
            <Avatar
                alt={`${user?.firstName} ${user?.lastName}`}
                src={user?.image || '/static/images/default-avatar.png'}
                sx={{ width: 100, height: 100, margin: 'auto' }}
            />
            <Typography variant="h4" gutterBottom>
                {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="h6" color="textSecondary">
                {user?.email}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={() => toast.error('You are not admin')}>
                    Edit Profile
                </Button>
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default UserProfilePage;
