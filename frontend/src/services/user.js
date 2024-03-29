import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

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

export default {
  signup,
  confirmAccount,
  login,
  logout
}
