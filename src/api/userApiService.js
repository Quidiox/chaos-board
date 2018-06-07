const baseUrl = 'http://localhost:3005/api/'

const login = async data => {
  try {
    const response = await fetch(baseUrl + 'login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async data => {
  try {
    const response = await fetch(baseUrl + 'user/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const verifyToken = async token => {
  try {
    const response = await fetch(baseUrl + 'login/verifytoken', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: token
      })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const edit = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'user/' + data.id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: token
      })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'user/' + data.id, {
      method: 'DELETE',
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default { login, create, edit, remove, verifyToken }
