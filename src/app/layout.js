'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import MasterLayout from '@/components/layout/MasterLayout';
import { RecoilRoot } from 'recoil';
// import { userDetails } from '@/recoil/userAtom';


export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  // const [localUser, setLocalUser] = useRecoilState(userDetails)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('https://dummyjson.com/user/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userData => {
          // setLocalUser(userData)
          setUser(userData);
          return fetch(`https://dummyjson.com/carts/user/${userData.id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        })
        .then(res => res.json())
        .then(cartData => setCart(cartData?.products ? cartData?.products : []))  // Use the first cart if multiple
        .catch(() => {
          localStorage.removeItem('token');
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    setUser(null);
    setCart([]);
    router.push('/login');
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <MasterLayout user={user} cart={cart} onLogout={handleLogout}>
              <CssBaseline />
              {children}
            </MasterLayout>
          </RecoilRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
