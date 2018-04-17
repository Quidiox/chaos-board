import {
  CONTAINER_MOVE,
  CONTAINER_CREATE,
  CONTAINER_DELETE,
  CONTAINER_EDIT
} from './actionTypes'

const containerReducer = (state = [], action) => {
  switch (action.type) {
    case CONTAINER_MOVE:
    case CONTAINER_CREATE:
    case CONTAINER_DELETE:
    case CONTAINER_EDIT:
    default:
      return state
  }
}

export default containerReducer
