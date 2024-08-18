'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Card, CardContent, Grid, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CustomTextField from '@/components/sharedComponents/CustomTextField';
import OrderSummaryCard from '@/components/sharedComponents/OrderSummaryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const theme = useTheme();
    const [cart, setCart] = useState([]);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const fetchCartData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`https://dummyjson.com/carts/${userData?.id}`, { // Replace with actual endpoint
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const cartData = await response.json();
                setCart(cartData.products || []);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                toast.error('Failed to fetch cart data');
            }
        }
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('https://dummyjson.com/user/me', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userData = await response.json();
                setUserData(userData);
                setFormData({
                    name: `${userData?.firstName} ${userData?.lastName}`,
                    email: userData?.email,
                    address: userData?.address?.address,
                    city: userData?.address?.city,
                    state: userData?.address?.state,
                    postalCode: userData?.address?.postalCode,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to fetch user data');
            }
        }
    };

    useEffect(() => {    

        fetchUserData();
    }, []);

    useEffect(()=>{
        fetchCartData();

    },[userData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // toast.success('Order placed successfully!');
        try {
            const response = await fetch(`https://dummyjson.com/carts/${userData?.id}`, {
                method: 'DELETE',
              })
              .then(res => res.json())
              
            // const response = await fetch('https://dummyjson.com/orders', { // Replace with actual endpoint
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     },
            //     body: JSON.stringify({
            //         ...formData,
            //         items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            //     })
            // });

            if (response.ok) {
                toast.success('Order placed successfully!');
                router.push('/products-list');

            } else {
                toast.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                color: theme.palette.primary.contrastText,
            }}
        >
            <Container>
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        maxWidth: '1200px',
                        margin: '0 auto',
                        background: theme.palette.background.paper,
                        boxShadow: theme.shadows[5],
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            sx={{
                                background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                padding: 2,
                                borderRadius: 2,
                                marginBottom: 4,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{ color: theme.palette.primary.contrastText }}
                            >
                                Checkout
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
                            <Box
                                sx={{
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    padding: 2,
                                    borderRadius: 2,
                                    marginBottom: 4,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.primary.contrastText }}
                                >
                                    Shipping Information
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField
                                        label="State"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField
                                        label="Postal Code"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ marginTop: 2 }}
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                background: `linear-gradient(90deg, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
                                padding: 2,
                                borderRadius: 2,
                                marginBottom: 4,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: theme.palette.success.contrastText }}
                            >
                                Order Summary
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                                <Typography variant="h6" sx={{ color: theme.palette.background.paper }}>Total: </Typography>
                                <Typography variant="h6"
                                    sx={{ color: theme.palette.background.paper, fontWeight: 'bold', marginLeft: '1rem' }} >
                                    ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            {cart.map((item) => (
                                <OrderSummaryCard key={item.id} item={item} />
                            ))}
                            <Divider />
                        </Box>
                    </motion.div>
                    <ToastContainer />
                </Paper>
            </Container>
        </Box>
    );
};

export default CheckoutPage;
