'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            //   console.log('response', response)
            if (response?.token) {
                console.log('response', response)
                router.push('/home');
                toast.success("login successful")
            }
            else {
                // alert(response?.message)
                setError(response?.message || 'Login failed');
                toast.error("Enter Valid Email Id");
                console.log('response message', response)

                toast.error(response?.message)


            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An unexpected error occurred.');
            toast.error('login failed')


        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <ToastContainer/>
        </Box>
    );
};

export default LoginPage;
