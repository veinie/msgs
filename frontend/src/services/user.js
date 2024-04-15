import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_USERAUTH_URL}`

const makeConfig = (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return config
}

const signup = async user => {
  try {
    const response = await axios.post(`${baseUrl}/users/signup`, user)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const confirmAccount = async (code) => {
  const response = await axios.get(`${baseUrl}/users/confirm/${code}`)
  return response.data
}

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const refreshToken = async (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const response = await axios.get(`${baseUrl}/login/refresh`, config)
  return response.data
}

const changePassword = async ({ token, oldPassword, newPassword }) => {
  const config = makeConfig(token)
  const payload = {
    oldPassword,
    newPassword
  }
  const response = await axios.post(`${baseUrl}/users/resetpassword`, payload, config)
  return response
}

const changeUsername = async ({ token, newUsername }) => {
  const response = axios.patch(`${baseUrl}/users/changeUsername`, { newUsername }, makeConfig(token))
  return response
}

const logout = async (token, global = false) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const bodyParameters = {
    global
  }
  try {
    const response = await axios.post(`${baseUrl}/logout`, bodyParameters, config)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const requestPasswordRecovery = async ({ email }) => {
  const response = await axios.post(`${baseUrl}/users/passwordresetrequest`, { email })
  return response
}

const recoverPassword = async ({ newPassword, recoveryToken }) => {
  const payload = {
    newPassword,
    recoveryToken
  }
  try {
    const response = await axios.post(`${baseUrl}/users/recoverpassword`, payload)
    return response.data
  } catch (error) {
    console.log(error)
    if (error.response.data.error === 'Token expired') {
      return { error: 'Recovery token expired. Please re-submit the password recovery request.' }
    } else {
      return { error: 'Something went wrong' }
    }
  }
}

const deleteAccount = async ({ userId, token }) => {
  const config = makeConfig(token)
  const payload = {
    userId
  }
  const response = await axios.delete(`${baseUrl}/users`, { ...config, data: payload })
  return response
}

export default {
  signup,
  confirmAccount,
  login,
  refreshToken,
  changePassword,
  changeUsername,
  logout,
  requestPasswordRecovery,
  recoverPassword,
  deleteAccount
}
