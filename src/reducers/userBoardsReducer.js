import produce from 'immer'
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

const userBoardsReducer = produce((draft, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case BOARD_FETCH_BY_USER: {
      return action.payload
    }
    case BOARD_CREATE: {
      draft.push(action.payload)
      return
    }
    case BOARD_EDIT: {
      const editIndex = draft.findIndex(board => {
        return board.id === action.payload.id
      })
      return draft[editIndex] = action.payload
    }
    case BOARD_DELETE: {
      return draft.filter(board => board.id !== action.payload.boardId)
    }
  }
}, [])

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
