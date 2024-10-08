'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Button, Badge } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import DrawerComponent from './Drawer';
import { cartItemsByUser } from '@/recoil/cartAtoms';
import { useRecoilState } from 'recoil';
import { userDetails } from '@/recoil/userAtom';

function MasterLayout({ children, user, cart, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [localCart, setLocalCart] = useRecoilState(cartItemsByUser);
  const [ localUser, setLocalUser] = useRecoilState(userDetails);

  useEffect(() => {
    // Update state if needed based on props or other conditions
    // console.log('user and cart', cart, user, localUser, localCart)
  }, [user, cart, localCart]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginSignup = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    onLogout();
    setLocalUser(null)
    setLocalCart(null)
    handleClose();
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
          {localUser && (
            <IconButton color="inherit" onClick={() => router.push('/cart')}>
              <Badge badgeContent={localCart?.length || 0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {localUser ? (
            <div>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar alt="User Avatar" src={localUser?.image || '/static/images/avatar/1.jpg'} />
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
      <main>

      {(user && cart?.length>0) ? React.Children.map(children, child => {
          return React.cloneElement(child, { user, cart }); 
        }): React.Children.map(children, child => {
          return React.cloneElement(child); 
        }) }
        </main>
    </div>
  );
}

MasterLayout.PropTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  onLogout: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default MasterLayout;
