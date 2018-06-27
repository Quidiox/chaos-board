import {
  USER_LOGIN_REQUEST,
  USER_LOGIN,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT,
  USER_VERIFY_TOKEN_REQUEST,
  USER_VERIFY_TOKEN,
  USER_CREATE_REQUEST,
  USER_CREATE,
  USER_DELETE_REQUEST,
  USER_DELETE,
  USER_EDIT_REQUEST,
  USER_EDIT
} from './actionTypes'

const user = window.localStorage.getItem('loggedChaosBoardUser')
let initialState = {}
if (user && user !== 'undefined') {
  initialState = JSON.parse(user)
} else {
  window.localStorage.removeItem('loggedChaosBoardUser')
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      window.localStorage.setItem(
        'loggedChaosBoardUser',
        JSON.stringify(action.payload)
      )
      return action.payload
    }
    case USER_LOGOUT: {
      window.localStorage.removeItem('loggedChaosBoardUser')
      return null
    }
    case USER_VERIFY_TOKEN: {
      return action.payload
    }
    case USER_CREATE: {
      window.localStorage.setItem(
        'loggedChaosBoardUser',
        JSON.stringify(action.payload)
      )
      return action.payload
    }
    case USER_EDIT: {
      console.log(action.payload)
      window.localStorage.setItem(
        'loggedChaosBoardUser',
        JSON.stringify(action.payload)
      )
      return Object.assign({}, state, action.payload)
    }
    case USER_DELETE: {
      window.localStorage.removeItem('loggedChaosBoardUser')
      return null
    }
    default:
      return state
  }
}

export const requestLoginUser = payload => ({
  type: USER_LOGIN_REQUEST,
  payload
})

export const requestLogoutUser = () => ({
  type: USER_LOGOUT_REQUEST
})

export const requestVerifyUserToken = payload => ({
  type: USER_VERIFY_TOKEN_REQUEST,
  payload
})

export const requestCreateUser = payload => ({
  type: USER_CREATE_REQUEST,
  payload
})

export const requestDeleteUser = payload => ({
  type: USER_DELETE_REQUEST,
  payload
})

export const requestEditUser = payload => ({
  type: USER_EDIT_REQUEST,
  payload
})

export default userReducer
