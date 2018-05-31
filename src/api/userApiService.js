const baseUrl = 'http://localhost:3005/api/'
const login = async data => {
  try {
    const user = await fetch(baseUrl + 'login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await user.json()
  } catch (error) {
    console.log(error)
  }
}

const verifyToken = async data => {
  try {
    const result = await fetch(baseUrl + 'login/verifytoken', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await result.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async data => {
  try {
    const user = await fetch(baseUrl + 'user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await user.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async data => {
  try {
    const user = await fetch(baseUrl + 'user/' + data.id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await user.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async data => {
  try {
    const response = await fetch(baseUrl + 'user/' + data.id, {
      method: 'DELETE'
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default { login, create, update, remove, verifyToken }
