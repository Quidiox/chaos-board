const baseUrl = 'http://localhost:3005/api/'
const fetchUsersBoards = async (token, user) => {
  try {
    const response = await fetch(
      baseUrl + 'board/' + user.id + '/boardsbyuser',
      {
        headers: new Headers({ Authorization: token })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const createBoard = async (token, data) => {
  try {
    const response = await fetch(baseUrl + 'board', {
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
    const response = await fetch(baseUrl + 'board/' + data.id, {
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
    const response = await fetch(baseUrl + 'board/' + data.id, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: token
      })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const addMemberToBoard = async (token, data, user) => {
  try {
    const response = await fetch(
      baseUrl + 'board/' + data.id + '/add/' + user.id,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: token
        })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const removeMemberFromBoard = async (token, data, user) => {
  try {
    const response = await fetch(
      baseUrl + 'board/' + data.id + '/remove/' + user.id,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: token
        })
      }
    )
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export default {
  fetchUsersBoards,
  createBoard,
  editBoard,
  deleteBoard,
  addMemberToBoard,
  removeMemberFromBoard
}
