'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Pagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductCard from '@/components/sharedComponents/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShimmerSkeleton from '@/components/sharedComponents/ShimmerSkeleton';

const ProductListingPage = () => {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cartId, setCartId] = useState(null);
    const limit = 8;

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}`);
            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.total / limit));
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://dummyjson.com/carts/user/1', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.carts.length > 0) {
                setCartId(data.carts[0].id);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
        fetchCart();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const userId = 1; // Replace with actual user ID from authentication

            if (!cartId) {
                // Create new cart
                const response = await fetch('https://dummyjson.com/carts/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({
                        userId: userId,
                        products: [{ id: product.id, quantity: 1 }]
                    })
                });
                const data = await response.json();
                setCartId(data.id); // Set cart ID for future updates
            } else {
                // Update existing cart
                await fetch(`https://dummyjson.com/carts/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({
                        merge: true,
                        products: [{ id: product.id, quantity: 1 }]
                    })
                });
            }
            toast.success(`${product.title} added to cart!`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(4) }}>
                Product Listings
            </Typography>

            <Grid container spacing={4}>
                {loading ? (
                    [...Array(limit)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ShimmerSkeleton width="100%" height={280} />
                            <Box sx={{ mt: 2 }}>
                                <ShimmerSkeleton width="60%" height={24} />
                                <ShimmerSkeleton width="80%" height={20} sx={{ mt: 1 }} />
                                <ShimmerSkeleton width="40%" height={20} sx={{ mt: 1 }} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {products.length === 0 ? (
                                <Typography variant="body1" sx={{ width: '100%', textAlign: 'center' }}>
                                    No products found
                                </Typography>
                            ) : (
                                products.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                        <ProductCard product={product} addToCart={addToCart} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </>
                )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(4) }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default ProductListingPage;
