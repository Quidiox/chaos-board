const baseUrl = 'http://localhost:3001/'

const fetchAllContainers = async () => {
  try {
    const response = await fetch(baseUrl + 'containers')
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const changeCardOrder = async ({ dragIndex, hoverIndex, listIndex }) => {
  try {
    console.log('hello world! ', dragIndex, hoverIndex, listIndex)
    /*const response = await fetch(baseUrl + 'containers/' + listIndex, {
      method: 'PUT',
      body: JSON.stringify(),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json() */
  } catch (error) {
    console.log(error)
  }
}

const changeContainerOrder = async id => {
  try {
    const response = await fetch(baseUrl + 'containers/' + id)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default { fetchAllContainers, changeCardOrder, changeContainerOrder }
