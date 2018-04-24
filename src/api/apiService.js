const baseUrl = 'http://localhost:3005/'

const fetchAllContainers = async () => {
  try {
    const response = await fetch(baseUrl + 'containers')
    const containers = await response.json()
    return containers
  } catch (error) {
    console.log(error)
  }
}

const changeCardOrder = async ({ dragIndex, hoverIndex, listIndex }) => {
  try {
    // console.log('hello world! ', dragIndex, hoverIndex, listIndex)
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

const changeContainerOrder = async ({ dragIndex, hoverIndex }) => {
  try {
    // console.log('hello container: ', dragIndex, hoverIndex)
    // const response = await fetch(baseUrl + 'containers/' + id)
    // return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const moveCardToAnotherContainer = async () => {
  try {
    // console.log('move card to other container')
  } catch (error) {
    console.log(error)
  }
}

const deleteCardFromOldContainer = async () => {
  try {
    // console.log('delete card')
  } catch (error) {
    console.log(error)
  }
}

export default {
  fetchAllContainers,
  changeCardOrder,
  changeContainerOrder,
  moveCardToAnotherContainer,
  deleteCardFromOldContainer
}
