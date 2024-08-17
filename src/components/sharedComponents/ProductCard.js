import React, {useContext} from 'react'
import { Box, Card, CardContent, CardMedia, Chip, Typography, CardActionArea, CardActions, Button } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate';
import { useTheme } from '@mui/material/styles';
import { CartProvider, useCart } from '../../contexts/cartContext';



function ProductCard({ product, toast, ToastContainer }) {
    const theme = useTheme();
    // const { addToCart } = useContext(CartProvider);
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title} added to cart!`); 
    };


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: theme.shadows[6],
                },
            }}
        >
            <CardActionArea sx={{ height: '100%' }}>


                <CardMedia
                    component="img"
                    height="280"
                    image={product.images[0]}
                    alt={product.title}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                    }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                        {product.description}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6" sx={{ marginRight: 1 }}>
                        ${product.price.toFixed(2)}
                    </Typography>
                    {product.discountPercentage > 0 && (
                        <Chip
                            label={`-${product.discountPercentage.toFixed(2)}%`}
                            color="warning"
                            sx={{ marginLeft: 1 }}
                        />
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarRateIcon color="warning" sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2">{product.rating.toFixed(1)}</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    sx={{ mt: 1 }}
                >
                    Add to Cart
                </Button>

            </CardActions>
        </Card>
    )
}

export default ProductCard
