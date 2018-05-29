import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import userReducer from './userReducer'

export const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  routing: routerReducer
})
