import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import userReducer from './userReducer'

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer
})

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})
