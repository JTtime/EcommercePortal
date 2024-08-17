'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import MasterLayout from '@/components/layout/MasterLayout';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/cartContext';

// export const metadata = {
//   title: 'eCommerce Store',
//   description: 'An awesome eCommerce store built with Next.js and Material UI',
// };

export default function RootLayout({ children }) {
  // const obj = useAuth()
  // console.log('useauth', obj)
  // const { user } = useAuth();
  // const router = useRouter();

  // const user = true;

  // useEffect(() => {

  //   console.log('user', user)
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user, router]);



  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <AuthUserCheck>
                <MasterLayout>
                  <CssBaseline />
                  {/* <Component {...pageProps} /> */}
                  {children}


                  {/* {children} */}
                </MasterLayout>
              </AuthUserCheck>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

const AuthUserCheck = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  console.log('user', user)

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <>{children}</>;
};
