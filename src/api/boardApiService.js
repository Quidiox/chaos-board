// const baseUrl = 'https://chaos-board-backend.herokuapp.com/api/'
// const initialBoardId='5b054242cbe9c7000469e95a' //heroku
const baseUrl = 'http://localhost:3005/api/'
const initialBoardId = '5ae9d453b0f47c69442dd3b9'

const fetchBoard = async (token, boardId = initialBoardId) => {
  try {
    const response = await fetch(baseUrl + 'board/' + boardId, {
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const fetchAllBoards = async token => {
  try {
    const response = await fetch(baseUrl + 'board', {
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const moveCard = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'card/move', {
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

const moveContainer = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'container/move', {
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

const moveCardBetweenContainers = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'card/betweencontainers', {
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

const createContainer = async (token, payload) => {
  try {
    const response = await fetch(baseUrl + 'container/' + payload.boardId, {
      method: 'POST',
      body: JSON.stringify(payload),
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

const deleteContainer = async (token, payload) => {
  try {
    const response = await fetch(
      baseUrl + 'container/' + payload.boardId + '/' + payload.containerId,
      {
        method: 'DELETE',
        headers: new Headers({ Authorization: token })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
    return error
  }
}

const editContainer = async (token, payload) => {
  try {
    const response = await fetch(
      baseUrl + 'container/edit/' + payload.containerId,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: token
        })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const createCard = async (token, payload) => {
  try {
    const response = await fetch(baseUrl + 'card/' + payload.containerId, {
      method: 'POST',
      body: JSON.stringify(payload),
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

const editCard = async (token, payload) => {
  try {
    const response = await fetch(baseUrl + 'card/edit/' + payload.cardId, {
      method: 'PUT',
      body: JSON.stringify(payload),
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

const deleteCard = async (token, payload) => {
  try {
    const response = await fetch(
      baseUrl + 'card/' + payload.containerId + '/' + payload.cardId,
      {
        method: 'DELETE',
        headers: new Headers({ Authorization: token })
      }
    )
    return await response.json()
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
