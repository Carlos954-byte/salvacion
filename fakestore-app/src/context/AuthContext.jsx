import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(username, password) {
    // Opcional: llamar al endpoint fakestoreapi para login real
    // https://fakestoreapi.com/docs#auth-login
    // Por simplicidad, simulo login exitoso si usuario y pass no vacíos
    if (username && password) {
      setUser({ username })
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}