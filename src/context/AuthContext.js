import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()

export const checkTokenExpired = (token) => {
  if (token) {
    localStorage.setItem('token', token)
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp > Math.round(new Date().getTime() / 1000)) {
        return { user: decoded, token }
      }
      localStorage.removeItem('token')
      return { user: null, token: null }
    } catch (err) {
      localStorage.removeItem('token')
      return { user: null, token: null }
    }
  } else {
    localStorage.removeItem('token')
    return { user: null, token: null }
  }
}

const useToken = () => {
  const [session, setSession] = useState(() => checkTokenExpired(localStorage.getItem('token')))
  const setToken = (t) => setSession(checkTokenExpired(t))
  const checkToken = () => checkTokenExpired(localStorage.getItem('token'))
  const removeToken = () => setSession(checkTokenExpired(null))
  const { user, token } = session
  return {
    user, token, setToken, checkToken, removeToken,
  }
}

export const AuthProvider = (props) => {
  const { children } = props
  const {
    user, token, setToken, checkToken, removeToken,
  } = useToken()
  return (
    <AuthContext.Provider value={{
      user, token, setToken, checkToken, removeToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node,
}
AuthProvider.defaultProps = {
  children: null,
}

export const AuthConsumer = AuthContext.Consumer

export default AuthContext

// import React, { useReducer, createContext } from 'react'
// import jwtDecode from 'jwt-decode'

// const initialState = {
//   user: null,
// }

// if (localStorage.getItem('jwtToken')) {
//   const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem('jwtToken')
//   } else {
//     initialState.user = decodedToken
//   }
// }

// const AuthContext = createContext({
//   user: null,
//   loginC: (userData) => {},
//   logout: () => {},
// })

// function authReducer(state, action) {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         user: action.payload,
//       }
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//       }
//     default:
//       return state
//   }
// }

// function AuthProvider(props) {
//   const [state, dispatch] = useReducer(authReducer, initialState)

//   function login(userData) {
//     localStorage.setItem('jwtToken', userData.token)
//     dispatch({
//       type: 'LOGIN',
//       payload: userData,
//     })
//     console.log(userData)
//   }

//   function logout() {
//     localStorage.removeItem('jwtToken')
//     dispatch({ type: 'LOGOUT' })
//   }
//   console.log(state)
//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user, role: state.role, login, logout,
//       }}
//       {...props}
//     />
//   )
// }

// export { AuthContext, AuthProvider }
