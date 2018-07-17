import {
  BOARD_FETCH_BY_USER_REQUEST,
  BOARD_FETCH_BY_USER,
  BOARD_CREATE_REQUEST,
  BOARD_CREATE,
  BOARD_EDIT_REQUEST,
  BOARD_EDIT,
  BOARD_DELETE_REQUEST,
  BOARD_DELETE
} from './actionTypes'

const userBoardsReducer = (state = [], action) => {
  switch (action.type) {
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
      if (editIndex === -1) {
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

export default userBoardsReducer
