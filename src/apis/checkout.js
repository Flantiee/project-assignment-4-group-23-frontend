import { request } from "@/util"
// 1. 登录请求

export function getCheckOutDetailAPI(id) {
    return request({
        url: `/checkout?id=${id}`,
        method: 'GET'
    })
}

export function getPreviousCheckOutListAPI(id) {
    return request({
        url: `/checkout/previous?id=${id}`,
        method: 'GET'
    })
}

export function confirmCheckOutAPI(id) {
    return request({
        url: `/checkout?id=${id}`,
        method: 'POST'
    })
}
