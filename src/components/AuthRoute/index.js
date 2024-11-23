import React, { useEffect } from 'react';
import { getToken } from '@/util'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@/store/module/user'

const AuthRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.user)
    const isToken = getToken()
    const dispatch = useDispatch()
    // 如果存在 token 并且用户信息还未加载，触发用户信息获取的请求
    if (isToken && !userInfo) {
        dispatch(fetchUserInfo()); // 假设传递 token
    }


    if (!isToken) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

}

export default AuthRoute