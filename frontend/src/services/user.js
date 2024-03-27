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
  const response = await axios.post(`${baseUrl}/logout`, bodyParameters, config)
  if (response.status === 200) {
    return response
  } else {
    console.log(response.data)
    return false
  }
}

export default {
  signup,
  login,
  logout
}
