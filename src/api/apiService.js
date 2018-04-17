const baseUrl = 'http://localhost:3001/'

const fetchAllContainers = async () => {
  try {
    const response = await fetch(baseUrl + 'containers')
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default { fetchAllContainers }
