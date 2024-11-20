import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken } from '@/util'
import { getUserInfoAPI, loginAPI } from '@/apis/user'
const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: null
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})

// 解构出actionCreater
const { setToken, setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm); // 调用登录 API
        // 登录成功，存储 token
        dispatch(setToken(res.token));
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfoAPI();
        dispatch(setUserInfo(res.data));
    }
}


export { fetchLogin, fetchUserInfo, setToken }

export default userReducer