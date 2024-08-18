import React from 'react';
import { Box, Card, CardContent, CardMedia, Chip, Typography, CardActionArea, CardActions, Button } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useTheme } from '@mui/material/styles';

const ProductCard = ({ product, addToCart }) => {
    const theme = useTheme();

    const handleAddToCart = () => {
        addToCart(product);
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
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing(1) }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    onClick={handleAddToCart}
                    sx={{ mt: 1 }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
