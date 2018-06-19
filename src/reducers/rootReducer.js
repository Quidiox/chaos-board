import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import userReducer from './userReducer'
import userBoardsReducer from './userBoardsReducer'

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  boards: userBoardsReducer
})

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})
