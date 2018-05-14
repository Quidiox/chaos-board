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

const changeContainerOrder = async data => {
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

const moveCardToAnotherContainer = async data => {
  try {
    const response = await fetch(baseUrl + 'api/container/addtonew', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteCardFromOldContainer = async data => {
  try {
    const response = await fetch(baseUrl + 'api/container/removefromold', {
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
  changeCardOrder,
  changeContainerOrder,
  moveCardToAnotherContainer,
  deleteCardFromOldContainer,
  createContainer,
  deleteContainer,
  editContainer,
  createCard,
  editCard,
  deleteCard,
  fetchBoard,
  fetchAllBoards
}
