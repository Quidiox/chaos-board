const baseUrl = 'http://localhost:3005/api/'

const fetchBoardsByUser = async (token, user) => {
  try {
    const response = await fetch(baseUrl + 'boards/' + user.id, {
      headers: new Headers({ Authorization: token })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const createBoard = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'boards', {
      method: 'POST',
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

const editBoard = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'boards/' + data.boardId, {
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

const deleteBoard = async (token, data) => {
  try {
    await fetch(baseUrl + 'boards/' + data.boardId, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: token
      })
    })
  } catch (error) {
    console.log(error)
  }
}

export default {
  fetchBoardsByUser,
  createBoard,
  editBoard,
  deleteBoard
}
