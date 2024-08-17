import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const OrderSummaryCard = ({ item }) => {
    const theme = useTheme();

    return (
        <Card key={item.id} sx={{ marginBottom: 2 }}>
        <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                {item.title} (${item.price.toFixed(2)})
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
            </Typography>
        </CardContent>
    </Card>
    );
};

export default OrderSummaryCard;
