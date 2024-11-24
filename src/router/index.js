import { createBrowserRouter } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/cart'
import Orders from '@/pages/Orders'
import CreateProduct from '@/pages/CreateProduct'
import EditProduct from '@/pages/EditProduct'
import UserInfo from '@/pages/UserInfo'
import CheckOut from '@/pages/CheckOut'
import AdminAuthRoute from '@/components/AdminAuthRoute'

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
        element: <AuthRoute><ProductDetail /></AuthRoute>
    },
    {
        path: '/cart',
        element: <AuthRoute><Cart /></AuthRoute>
    },
    {
        path: '/orders',
        element: <AuthRoute><Orders /></AuthRoute>
    },
    {
        path: '/check-out',
        element: <AuthRoute><CheckOut /></AuthRoute>
    },
    {
        path: '/user-info',
        element: <AuthRoute><UserInfo /></AuthRoute>
    },
    {
        path: '/create-product',
        element: <AdminAuthRoute><CreateProduct /></AdminAuthRoute>
    },
    {
        path: '/edit-product/:id',
        element: <AdminAuthRoute><EditProduct /></AdminAuthRoute>
    }



])

export default router