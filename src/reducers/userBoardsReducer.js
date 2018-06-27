import {
  BOARD_FETCH_BY_USER_REQUEST,
  BOARD_FETCH_BY_USER,
  BOARD_ADD_MEMBER_REQUEST,
  BOARD_ADD_MEMBER,
  BOARD_REMOVE_MEMBER_REQUEST,
  BOARD_REMOVE_MEMBER,
  BOARD_CREATE_REQUEST,
  BOARD_CREATE,
  BOARD_EDIT_REQUEST,
  BOARD_EDIT,
  BOARD_REMOVE_REQUEST,
  BOARD_REMOVE,
  USER_LOGOUT
} from './actionTypes'

const userBoardsReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return []
    }
    case BOARD_FETCH_BY_USER: {
      return action.payload
    }
    case BOARD_CREATE: {
      return [...state, action.payload]
    }
    case BOARD_EDIT: {
      const editedIndex = state.forEach((board, i) => {
        if (board.id === action.payload.id) {
          return i
        }
      })
      return [
        ...state.slice(0, editedIndex),
        action.payload,
        ...state.slice(editedIndex + 1)
      ]
    }
    case BOARD_REMOVE: {
      const removedIndex = state.forEach((board, i) => {
        if (board.id === action.payload.id) {
          return i
        }
      })
      return [...state.slice(0, removedIndex), ...state.slice(removedIndex + 1)]
    }
    case BOARD_ADD_MEMBER: {
      return state
    }
    case BOARD_REMOVE_MEMBER: {
      return state
    }
    default:
      return state
  }
}

export const requestFetchBoardsByUser = payload => ({
  type: BOARD_FETCH_BY_USER_REQUEST,
  payload
})

export const requestCreateBoard = payload => ({
  type: BOARD_CREATE_REQUEST,
  payload
})

export const requestEditBoard = payload => ({
  type: BOARD_EDIT_REQUEST,
  payload
})

export const requestRemoveBoard = payload => ({
  type: BOARD_REMOVE_REQUEST,
  payload
})

export const requestAddBoardMember = payload => ({
  type: BOARD_ADD_MEMBER_REQUEST,
  payload
})

export const requestRemoveBoardMember = payload => ({
  type: BOARD_REMOVE_MEMBER_REQUEST,
  payload
})

export default userBoardsReducer
