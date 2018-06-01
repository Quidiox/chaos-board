import { setToken } from '../utils/helpers'
// const baseUrl = 'https://chaos-board-backend.herokuapp.com/api/'
// const initialBoardId='5b054242cbe9c7000469e95a' //heroku
const baseUrl = 'http://localhost:3005/api/'
const initialBoardId = '5ae9d453b0f47c69442dd3b9'

const fetchBoard = async (boardId = initialBoardId) => {
  try {
    const token = setToken()
    const response = await fetch(baseUrl + 'board/' + boardId, {
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const fetchAllBoards = async () => {
  try {
    const token = setToken()
    const response = await fetch(baseUrl + 'board', {
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const moveCard = async data => {
  try {
    const token = setToken()
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

const moveContainer = async data => {
  try {
    const token = setToken()
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

const moveCardBetweenContainers = async data => {
  try {
    const token = setToken()
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

const createContainer = async payload => {
  try {
    const token = setToken()
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

const deleteContainer = async payload => {
  try {
    const token = setToken()
    await fetch(
      baseUrl + 'container/' + payload.boardId + '/' + payload.containerId,
      {
        method: 'DELETE',
        headers: new Headers({ Authorization: token })
      }
    )
  } catch (error) {
    console.log(error)
    return error
  }
}

const editContainer = async payload => {
  try {
    const token = setToken()
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

const createCard = async payload => {
  try {
    const token = setToken()
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

const editCard = async payload => {
  try {
    const token = setToken()
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

const deleteCard = async payload => {
  try {
    const token = setToken()
    await fetch(
      baseUrl + 'card/' + payload.containerId + '/' + payload.cardId,
      {
        method: 'DELETE',
        headers: new Headers({ Authorization: token })
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
