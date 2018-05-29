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

const userReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return state
    }
    case USER_LOGOUT: {
      return state
    }
    case USER_VERIFY_TOKEN: {
      return state
    }
    case USER_CREATE: {
      return state
    }
    case USER_EDIT: {
      return state
    }
    case USER_DELETE: {
      return state
    }
    default:
      return state
  }
}

export const requestUserLogin = payload => ({
  type: USER_LOGIN_REQUEST,
  payload
})

export const requestUserLogout = payload => ({
  type: USER_LOGOUT_REQUEST,
  payload
})

export const requestCreateUser = payload => ({
  type: USER_CREATE_REQUEST,
  payload
})

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})

export default userReducer
