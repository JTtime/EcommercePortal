'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, TextField, IconButton, Divider, Card, CardContent, CardActions } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useCart } from '@/contexts/cartContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [editingProductId, setEditingProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();


    const handleQuantityChange = (productId) => {
        updateQuantity(productId, quantity);
        setEditingProductId(null);
    };

    const handleCheckout = () => {
        console.log('Proceed to checkout');
        router.push('./checkout')
    };

    const removeProductFromCart =({id, title}) => {
        removeFromCart(id)
        toast.success(`${title} removed from cart`)
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Your Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
            ) : (
                cart.map((item) => (
                    <Card key={item.id} sx={{ marginBottom: 2, padding: 2, display: 'flex', alignItems: 'center', boxShadow: 3 }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">
                                {item.title} (${item.price.toFixed(2)})
                            </Typography>
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
                                        onClick={() => handleQuantityChange(item.id)}
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
                                    onClick={() => setEditingProductId(item.id)}
                                    sx={{ marginRight: 1 }}
                                >
                                    Edit Quantity
                                </Button>
                            )}
                            <IconButton onClick={() => removeProductFromCart({id: item.id, title: item.title})} color="error">
                                <RemoveCircleIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))
            )}
            {cart.length > 0 && (
                <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <Button variant="contained" color="primary" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Box>
            )}
            <ToastContainer/>
        </Box>
    );
};

export default CartPage;
