/*"use client"

import { createContext, useState, useEffect, useContext } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken")
    const storedUsername = localStorage.getItem("username")
    if (storedToken && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
      setToken(storedToken)
    }
  }, [])

  const login = (newToken, newUsername) => {
    localStorage.setItem("userToken", newToken)
    localStorage.setItem("username", newUsername)
    setIsAuthenticated(true)
    setUsername(newUsername)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUsername(null)
    setToken(null)
  }

  const getAuthenticatedFetch = () => {
    return (url, options = {}) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        login,
        logout,
        getAuthenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

*/
"use client"

import { createContext, useState, useEffect, useContext } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken")
    const storedUsername = localStorage.getItem("userEmail")
    if (storedToken && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
      setToken(storedToken)
    }
  }, [])

  const login = (newToken, newUsername) => {
    localStorage.setItem("userToken", newToken)
    localStorage.setItem("userEmail", newUsername)
    setIsAuthenticated(true)
    setUsername(newUsername)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userEmail")
    setIsAuthenticated(false)
    setUsername(null)
    setToken(null)
  }

  const getAuthenticatedFetch = () => {
    return async (url, options = {}) => {
      const token = localStorage.getItem("userToken")
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 401) {
        logout()
        throw new Error("Unauthorized")
      }
      return response
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        token,
        login,
        logout,
        getAuthenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

