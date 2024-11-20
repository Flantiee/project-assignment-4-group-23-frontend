import axios from 'axios'
import { getToken, removeToken } from "./token"
import router from "@/router"

// Create an instance of axios with custom configuration
const request = axios.create({
    baseURL: 'http://127.0.0.1:7777',  // Base URL for all requests
    timeout: 5000  // Request timeout set to 5 seconds
})

// Add a request interceptor
request.interceptors.request.use((config) => {
    // Modify or log the request before it is sent
    const token = getToken()
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config
}, (error) => {
    // Handle errors in the request
    return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use((response) => {
    // This function is triggered if the response status is in the 2xx range
    // Process the response data before returning
    return response.data
}, (error) => {
    console.dir(error)
    if (error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export default request 
