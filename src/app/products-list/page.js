'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Grid, Box, Typography, Pagination, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import ProductCard from '@/components/sharedComponents/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShimmerSkeleton from '@/components/sharedComponents/ShimmerSkeleton';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { cartItemsByUser } from '../../recoil/cartAtoms'
import { userDetails } from '@/recoil/userAtom';

const ProductListingPage = () => {
    const theme = useTheme();
    const [user, setUser] = useState();
    const [localUser, setLocalUser] = useRecoilState(userDetails)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cartId, setCartId] = useState(null);
    const [cart, setCart] = useRecoilState(cartItemsByUser);

    const limit = 8;
    const router = useRouter();

    const token = localStorage.getItem('token');


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

    const fetchUser = () => {
        try {

            if (token) {
                console.log('token', token)
                fetch('https://dummyjson.com/user/me', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(userData => {
                        setLocalUser(userData)
                        setUser(userData);
                        return fetch(`https://dummyjson.com/carts/user/${userData.id}`, {
                            method: 'GET',
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                    })
                    .then(res => res.json())
                    .then(cartData => setCart(cartData?.carts[0]?.products ? cartData?.carts[0]?.products : []))
                    .catch(() => {
                        localStorage.removeItem('token');
                        router.push('/login');
                    });
            } else {
                router.push('/login');
            }

        } catch (error) {
            console.error('error fetching user on productListing page', error)

        }

    }

    const fetchCart = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/carts/user/${user.id}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json()).then(data => {
                if (data.carts.length > 0) {
                    setCartId(data.carts[0]?.id);
                    setCart(data?.carts[0]?.products)
                }
            }).catch((error) => {
                console.log('error fetching cart data by user', error)
                localStorage.removeItem('token');
                router.push('/login');
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useLayoutEffect(() => {
        if (token) {
            fetchUser();
        }
        else {
            router.push('/login');
        }
    }, [token])

    useEffect(() => {
        fetchProducts(currentPage);
        fetchCart();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //       fetch('https://dummyjson.com/user/me', {
    //         method: 'GET',
    //         headers: { 'Authorization': `Bearer ${token}` }
    //       })
    //       .then(res => res.json())
    //       .then(userData => {
    //         setUser(userData);
    //         return fetch(`https://dummyjson.com/carts/user/${userData.id}`, {
    //           method: 'GET',
    //           headers: { 'Authorization': `Bearer ${token}` }
    //         });
    //       })
    //       .then(res => res.json())
    //       .then(cartData => setLocalCart(cartData?.products ? cartData?.products : []))  // Use the first cart if multiple
    //       .catch(() => {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('refreshToken');

    //         router.push('/login');
    //       });
    //     } else {
    //       router.push('/login');
    //     }
    //   }, [router, currentPage]);

    const addToCart = async (product) => {
        console.log('cartData', cart)
        console.log('user on productlist', user?.id, user)
        toast.success(`${product?.title} added to cart!`);

        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        // try {
        //     // const userId = 1; // Replace with actual user ID from authentication

        //     if (!cartId) {
        //         // Create new cart
        //         const response = await fetch('https://dummyjson.com/carts/add', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        //             body: JSON.stringify({
        //                 userId: user?.id,
        //                 products: [{ id: product.id, quantity: 1 }]
        //             })
        //         }).then(res => res?.json()).then(data => {
        //             setCartId(data?.id)
        //             fetchCart();
        //         })

        //         // }
        //     } else {
        //         // Update existing cart
        //         fetch(`https://dummyjson.com/carts/${cartId}`, {
        //             method: 'PUT',
        //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        //             body: JSON.stringify({
        //                 merge: true,
        //                 products: [{ id: product.id, quantity: 1 }]
        //             })
        //         }).then(res => res.json()).then(() => fetchCart())
        //     }

        //     toast.success(`${product?.title} added to cart!`);
        // } catch (error) {
        //     console.error('Error adding product to cart:', error);
        //     toast.error('Failed to add product to cart');
        // }
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
                    <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
                        <Typography variant="h2" sx={{ marginBottom: theme.spacing(4) }}>
                            Product Listings
                        </Typography>

                        <Grid container spacing={4} sx={{ marginTop: 0 }}>
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
                        <ToastContainer
                            autoClose={1000}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProductListingPage;
