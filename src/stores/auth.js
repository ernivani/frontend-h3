import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_URL } from '../config'

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
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)
  const isAuthenticated = computed(() => !!token.value)

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

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })
      
      // Vérifier si le token est présent dans la réponse
      if (!response.data.token) {
        throw new Error('Token non reçu du serveur')
      }

      token.value = response.data.token
      localStorage.setItem('token', token.value)
      setAxiosAuth(token.value)
      
      // Fetch user profile after login
      await fetchUserProfile()
      
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      })
      
      // Vérifier si le token est présent dans la réponse
      if (!response.data.token) {
        throw new Error('Token non reçu du serveur')
      }

      token.value = response.data.token
      localStorage.setItem('token', token.value)
      setAxiosAuth(token.value)
      
      // Fetch user profile after registration
      await fetchUserProfile()
      
      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    setAxiosAuth(null)
  }

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/me')
      user.value = response.data
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        // Token invalide ou expiré
        logout()
      }
      throw error
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/users/me', userData)
      user.value = response.data
      
      // La mise à jour du profil invalide le token actuel
      // On déconnecte l'utilisateur pour qu'il se reconnecte
      logout()
      
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        logout()
      }
      throw error
    }
  }

  // Try to fetch user profile on page reload if token exists
  if (token.value) {
    fetchUserProfile().catch(() => {
      // If fetching profile fails, token might be invalid
      logout()
    })
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUserProfile,
    updateProfile
  }
}) 