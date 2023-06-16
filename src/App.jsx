import React, { createContext, useState, useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const Context = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsUserLoaded(true);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isUserLoaded) {
      // Wait until user data is loaded
      return null;
    }

    if (!user || user.role !== 'admin') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="outlet-container">
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/users', element: <UserList /> },
        { path: '/user/:userId', element: <User /> },
        { path: '/newUser', element: <NewUser /> },
        { path: '/products', element: <ProductList /> },
        { path: '/product/:productId', element: <Product /> },
        { path: '/newproduct', element: <NewProduct /> },
      ],
    },
    { path: '/login', element: <Login /> },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </Context.Provider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
