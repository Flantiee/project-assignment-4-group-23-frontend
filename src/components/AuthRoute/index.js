import { getToken } from '@/util'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/module/user'

const AuthRoute = ({ children }) => {
    const isToken = getToken()
    const dispatch = useDispatch()
    if (isToken) {
        dispatch(fetchUserInfo())
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace />
    }
}

export default AuthRoute