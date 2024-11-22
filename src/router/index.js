import { createBrowserRouter } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/cart'
import Orders from '@/pages/Orders'
import ProductModifier from '@/pages/ProductModifier'
import UserInfo from '@/pages/UserInfo'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/productdetail/:id',
        element: <ProductDetail />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/orders',
        element: <Orders />
    },
    {
        path: '/product-modifier',
        element: <ProductModifier />
    },
    {
        path: '/user-info',
        element: <AuthRoute><UserInfo /></AuthRoute>
    }

])

export default router