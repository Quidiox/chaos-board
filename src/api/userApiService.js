const baseUrl = 'http://localhost:3005/api/'
const login = async data => {
  try {
    const token = await fetch(baseUrl + 'login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await token.json()
  } catch (error) {
    console.log(error)
  }
}

export default { login }
