const baseUrl = 'http://localhost:3005/'

const fetchBoard = async (boardId = '5ae9d453b0f47c69442dd3b9') => {
  try {
    const response = await fetch(baseUrl + 'api/board/' + boardId)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const fetchAllBoards = async () => {
  try {
    const response = await fetch(baseUrl + 'api/board')
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const changeCardOrder = async data => {
  try {
    const response = await fetch(
      baseUrl + 'api/card/move',
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' })
      }
    )
    return await response.json()
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
  changeCardOrder,
  changeContainerOrder,
  moveCardToAnotherContainer,
  deleteCardFromOldContainer,
  fetchBoard,
  fetchAllBoards
}
