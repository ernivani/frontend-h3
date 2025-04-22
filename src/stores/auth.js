import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important pour CORS avec credentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Configure axios with token
  const setAxiosAuth = (tokenValue) => {
    if (tokenValue) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }

  // Initialize axios auth header if token exists
  if (token.value) {
    setAxiosAuth(token.value)
  }

  async function login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      setAxiosAuth(token.value)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  async function register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      setAxiosAuth(token.value)
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  async function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    setAxiosAuth(null)
  }

  async function checkAuth() {
    if (!token.value) return false
    
    try {
      const response = await api.get('/users/me')
      user.value = response.data
      return true
    } catch (error) {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      return false
    }
  }

  // Initialize user data if token exists
  if (token.value) {
    checkAuth()
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    checkAuth
  }
}) 