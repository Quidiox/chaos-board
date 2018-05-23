// const baseUrl = 'http://localhost:3005/' 
const baseUrl = 'https://chaos-board-backend.herokuapp.com/'
const herokuBoardId='5b054242cbe9c7000469e95a'
const boardId='5ae9d453b0f47c69442dd3b9'

const fetchBoard = async (boardId = herokuBoardId) => {
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

const moveCard = async data => {
  try {
    const response = await fetch(baseUrl + 'api/card/move', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const moveContainer = async data => {
  try {
    const response = await fetch(baseUrl + 'api/container/move', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const moveCardBetweenContainers = async data => {
  try {
    const response = await fetch(baseUrl + 'api/card/betweencontainers', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const createContainer = async payload => {
  try {
    const response = await fetch(baseUrl + 'api/container/' + payload.boardId, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteContainer = async payload => {
  try {
    await fetch(
      baseUrl + 'api/container/' + payload.boardId + '/' + payload.containerId,
      {
        method: 'DELETE'
      }
    )
  } catch (error) {
    console.log(error)
    return error
  }
}

const editContainer = async payload => {
  try {
    const response = await fetch(
      baseUrl + 'api/container/edit/' + payload.containerId,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: new Headers({ 'Content-Type': 'application/json' })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const createCard = async payload => {
  try {
    const response = await fetch(baseUrl + 'api/card/' + payload.containerId, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const editCard = async payload => {
  try {
    const response = await fetch(baseUrl + 'api/card/edit/' + payload.cardId, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteCard = async payload => {
  try {
    await fetch(
      baseUrl + 'api/card/' + payload.containerId + '/' + payload.cardId,
      {
        method: 'DELETE'
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export default {
  moveCard,
  moveContainer,
  createContainer,
  deleteContainer,
  editContainer,
  createCard,
  editCard,
  deleteCard,
  fetchBoard,
  fetchAllBoards,
  moveCardBetweenContainers
}
