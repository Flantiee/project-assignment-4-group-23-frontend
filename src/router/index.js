import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProductDetail from '@/pages/ProductDetail'
import AuthRoute from '@/components/AuthRoute'

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
    }

])

export default router