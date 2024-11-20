import { request } from "@/util"

export function createProductAPI(formData) {
    return request({
        url: '/products',
        method: 'POST',
        data: formData
    })
}

export function updateProductAPI(formData) {
    return request({
        url: '/products',
        method: 'PUT',
        data: formData
    })
}

export function deleteProductAPI(id) {
    return request({
        url: `/products/${id}`,
        method: 'DELETE'
    })
}

export function getProductDetailAPI(id) {
    return request({
        url: `/products/${id}`,
        method: 'GET'
    })
}

export function getProductListAPI(formData) {
    const queryParams = new URLSearchParams(formData).toString();
    return request({
        url: `/products/${queryParams}`,
        method: 'GET'
    })
}