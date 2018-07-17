import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import userReducer from './userReducer'
import userBoardsReducer from './userBoardsReducer'
import usersReducer from './usersReducer'

const appReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  boards: userBoardsReducer,
  users: usersReducer
})

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  } else if(action.type === 'USER_DELETE') {
    state = undefined
  }
  return appReducer(state, action)
}

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})
