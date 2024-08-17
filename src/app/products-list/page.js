'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Pagination, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductCard from '@/components/sharedComponents/ProductCard';
import ShimmerSkeleton from '@/components/sharedComponents/ShimmerSkeleton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const ProductListingPage = () => {
    const theme = useTheme();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit=8;

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=${limit}`);
            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.total / 10)); 
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} toast={toast} ToastContainer={ToastContainer}/>
                        </Grid>
                    ))
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
            <ToastContainer/>
        </Box>
    );
};

export default ProductListingPage;
