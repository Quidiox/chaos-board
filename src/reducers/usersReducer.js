import { USER_GET_ALL_REQUEST, USER_GET_ALL } from './actionTypes'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case USER_GET_ALL: {
      return action.payload
    }
    default:
      return state
  }
}

export const requestGetAllUsers = () => ({
  type: USER_GET_ALL_REQUEST
})

export default usersReducer
