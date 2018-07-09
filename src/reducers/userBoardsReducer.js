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
  BOARD_DELETE_REQUEST,
  BOARD_DELETE,
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
      const editIndex = state.findIndex(board => {
        return board.id === action.payload.id
      })
      if (editIndex === undefined) {
        return state
      }
      return [
        ...state.slice(0, editIndex),
        action.payload,
        ...state.slice(editIndex + 1)
      ]
    }
    case BOARD_DELETE: {
      const removeIndex = state.findIndex(board => {
        return board.id === action.payload.boardId
      })
      if (removeIndex === undefined) {
        return state
      }
      return [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)]
    }
    case BOARD_ADD_MEMBER: {
      console.log(action.payload)
      return state
    }
    case BOARD_REMOVE_MEMBER: {
      console.log(action.payload)
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

export const requestDeleteBoard = payload => ({
  type: BOARD_DELETE_REQUEST,
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
