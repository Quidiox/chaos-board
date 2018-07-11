import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import userReducer from './userReducer'
import userBoardsReducer from './userBoardsReducer'
import usersReducer from './usersReducer'

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  boards: userBoardsReducer,
  users: usersReducer
})

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})
