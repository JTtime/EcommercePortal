'use client';
import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Button, Badge } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import DrawerComponent from './Drawer';
import { useAuth } from '@/contexts/AuthContext';
// import { CartContext } from '@/contexts/cartContext';
import { useCart } from '@/contexts/cartContext';
// import { CartContext } from '@/contexts/CartContext'; 


export default function MasterLayout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  // const { cart } = useContext(CartContext);
  const { cart } = useCart();

  // const { cart } = useCart();
  const router = useRouter();
  // const user = null;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginSignup = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    handleLoginSignup();
  };



  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Commerce Portal
          </Typography>
          {user && (
            <IconButton color="inherit" onClick={() => router.push('/cart')}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {user ? (
            <div>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar alt="User Avatar" src={user.image || '/static/images/avatar/1.jpg'} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLoginSignup}>
              Login / Signup
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <DrawerComponent open={drawerOpen} onClose={toggleDrawer(false)} />
      <main>{children}</main>
    </div>
  );
}
