
import { request } from "@/util"
// 1. 登录请求

export function createCartAPI(formData) {
    return request({
        url: '/cart',
        method: 'POST',
        data: formData
    })
}

export function updateCartAPI(formData) {
    return request({
        url: '/cart',
        method: 'PUT',
        data: formData
    })
}

export function deleteCartAPI(id) {
    return request({
        url: `/cart/?id=${id}`,
        method: 'DELETE'
    })
}

export function getCartListPI(id) {
    return request({
        url: `/cart/?id=${id}`,
        method: 'GET'
    })
}