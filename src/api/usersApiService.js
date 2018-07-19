import { baseUrl } from '../utils/constants'

const getAllUsers = async token => {
  try {
    const response = await fetch(baseUrl + 'user', {
      method: 'GET',
      headers: new Headers({Authorization: token})
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default { getAllUsers }