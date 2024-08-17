'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getCookie('token') || '');
  const [userData, setUserData] = useState({})


  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/user/${id}`).then(res => res.json())
      if (response) {
        console.log('success', response)
        setUserData(response)

      }

    } catch (error) {
      console.error('Token decoding error:', err.message);

    }
  }

  useEffect(() => {
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (err) {
        console.error('Token decoding error:', err.message);
      }
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      console.log('user.id', user?.id)
      fetchUserData(user?.id)
    }

  }, [user])

  const login = async (username, password) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data?.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setCookie('token', data.token);
        return data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCookie('token', '', { expires: new Date(0) });
  };

  return (
    <AuthContext.Provider value={{ user, userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
