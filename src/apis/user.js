// 用户相关的所有请求
import { request } from "@/util"
// 1. 登录请求

export function loginAPI(formData) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: formData
    })
}

export function registerAPI(formData) {
    return request({
        url: '/user/register',
        method: 'POST',
        data: formData
    })
}

export function updateUserAPI(formData) {
    return request({
        url: '/user/update',
        method: 'PUT',
        data: formData
    })
}

export function getUserInfoAPI(formData) {
    return request({
        url: '/user',
        method: 'GET'
    })
}
