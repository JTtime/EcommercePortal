'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, TextField, IconButton, Card, CardContent, CircularProgress } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from '@/components/sharedComponents/LoaderComponent';
import { useRecoilState } from 'recoil';
import { cartItemsByUser } from '@/recoil/cartAtoms';
import { useTheme } from '@mui/material/styles';

const CartPage = () => {
    const [editingProductId, setEditingProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [localCart, setLocalCart] = useState();
    const [user, setUser] = useState();
    const [cart, setCart] = useRecoilState(cartItemsByUser);
    const router = useRouter();
    const theme=useTheme();

    useEffect(() => {
        console.log('local cart', cart)

    }, [localCart])

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('https://dummyjson.com/user/me', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(userData => {
                    setUser(userData);
                    return fetch(`https://dummyjson.com/carts/user/${userData.id}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                })
                .then(res => res.json())
                .then(cartData => setLocalCart(cartData?.products ? cartData?.products : []))  // Use the first cart if multiple
                .catch(() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                });
        } else {
            router.push('/login');
        }
    }, [router]);

    const updateQuantity = async (productId, quantity) => {
        toast.success('Quantity updated successfully');

        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
        setEditingProductId(null)



        // try {
        //     const response = await fetch(`https://dummyjson.com/carts/user/${user.id}`, {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             merge: true,
        //             products: [{ id: productId, quantity: newQuantity }]
        //         })
        //     });
        //     const updatedCart = await response.json();
        //     setLocalCart([...updatedCart?.products]);
        //     setEditingProductId(null);
        //     toast.success('Quantity updated successfully');
        // } catch (error) {
        //     console.error('Error updating quantity:', error);
        //     toast.error('Failed to update quantity');
        // }
    };

    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
        toast.error('Product deleted from the cart Successfully')
    };

    // const removeProductFromCart = async (productId) => {
    // try {
    //     const response = await fetch(`https://dummyjson.com/carts/user/${user.id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             merge: true,
    //             products: [{ id: productId, quantity: 0 }]
    //         })
    //     });
    //     const updatedCart = await response.json();
    //     setLocalCart(updatedCart.products);
    //     toast.success('Item removed from cart');
    // } catch (error) {
    //     console.error('Error removing item:', error);
    //     toast.error('Failed to remove item');
    // }
    // };

    const handleQuantityChange = () => {
        updateQuantity(editingProductId, quantity);
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };





    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Your Cart
            </Typography>
            {!cart ? <LoaderComponent /> : cart?.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>Total: </Typography>
                        <Typography variant="h6"
                            sx={{ color: theme.palette.primary.main, fontWeight: 'bold', marginLeft: '1rem' }} >
                            ${cart && cart?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                        </Typography>
                    </Box>
                    {cart.map((item) => (
                        <Card key={item.id} sx={{ marginBottom: 2, padding: 2, display: 'flex', alignItems: 'center', boxShadow: 3 }}>
                            <CardContent sx={{ flex: 1, width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Box>
                                        <Typography variant="h6">
                                            {item.title} (${item.price.toFixed(2)})
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </Box>
                                </Box>
                                {editingProductId === item.id ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                        <TextField
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            size="small"
                                            sx={{ width: 60, marginRight: 1 }}
                                            inputProps={{ min: 1 }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleQuantityChange}
                                        >
                                            Update
                                        </Button>
                                        <IconButton onClick={() => setEditingProductId(null)} sx={{ ml: 1 }}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setQuantity(item.quantity);
                                            setEditingProductId(item.id);
                                        }}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit Quantity
                                    </Button>
                                )}
                                <IconButton onClick={() => removeProductFromCart(item.id)} color="error">
                                    <RemoveCircleIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
            {(cart && cart?.length > 0) && (
                <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <Button variant="contained" color="primary" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Box>
            )}
            <ToastContainer
                autoClose={1000}
            />
        </Box>
    );
};

export default CartPage;
