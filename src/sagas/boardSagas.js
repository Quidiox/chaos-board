import { call, put, takeLatest, actionChannel, take } from 'redux-saga/effects'
import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE,
  CARD_CREATE_REQUEST,
  CARD_CREATE,
  CARD_EDIT_REQUEST,
  CARD_EDIT,
  CONTAINER_CREATE_REQUEST,
  CONTAINER_CREATE,
  CONTAINER_DELETE_REQUEST,
  CONTAINER_DELETE,
  CONTAINER_EDIT_REQUEST,
  CONTAINER_EDIT,
  CARD_DELETE_REQUEST,
  CARD_DELETE,
  CARD_MOVE_BETWEEN_CONTAINERS_REQUEST,
  CARD_MOVE_BETWEEN_CONTAINERS,
  BOARD_CHANGE_MEMBERS_REQUEST,
  BOARD_CHANGE_MEMBERS,
  BOARD_FETCH_BOARD_AND_MEMBERS_REQUEST,
  BOARD_FETCH_BOARD_AND_MEMBERS
} from '../reducers/actionTypes'
import apiService from '../api/boardApiService'
import { genericActionCreator } from '../reducers/rootReducer'
import { withToken } from './helpers'

function* initializeBoard(token, action) {
  try {
    const board = yield call(apiService.fetchBoard, token, action.payload)
    yield put(genericActionCreator(BOARD_INITIALIZE, board))
  } catch (error) {
    console.log(error)
  }
}
function* watchInitializeBoard() {
  yield takeLatest(BOARD_INITIALIZE_REQUEST, withToken(initializeBoard))
}

function* moveCard(token, action) {
  try {
    yield call(apiService.moveCard, token, action.payload)
  } catch (error) {
    console.log(error)
  }
}

function* moveCardBetweenContainers(token, action) {
  try {
    yield call(apiService.moveCardBetweenContainers, token, action.payload)
    yield put(
      genericActionCreator(CARD_MOVE_BETWEEN_CONTAINERS, action.payload)
    )
  } catch (error) {
    console.log(error)
  }
}

function* moveContainer(token, action) {
  try {
    yield call(apiService.moveContainer, token, action.payload)
    yield put(genericActionCreator(CONTAINER_MOVE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* createContainer(token, action) {
  try {
    const response = yield call(
      apiService.createContainer,
      token,
      action.payload
    )
    yield put(genericActionCreator(CONTAINER_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}
function* watchCreateContainer() {
  yield takeLatest(CONTAINER_CREATE_REQUEST, withToken(createContainer))
}

function* createCard(token, action) {
  try {
    const response = yield call(apiService.createCard, token, action.payload)
    yield put(genericActionCreator(CARD_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateCard() {
  yield takeLatest(CARD_CREATE_REQUEST, withToken(createCard))
}

function* editCard(token, action) {
  try {
    const response = yield call(apiService.editCard, token, action.payload)
    yield put(
      genericActionCreator(CARD_EDIT, response, null, {
        containerId: action.payload.containerId
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function* watchEditCard() {
  yield takeLatest(CARD_EDIT_REQUEST, withToken(editCard))
}

function* deleteCard(token, action) {
  try {
    yield call(apiService.deleteCard, token, action.payload)
    yield put(genericActionCreator(CARD_DELETE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteCard() {
  yield takeLatest(CARD_DELETE_REQUEST, withToken(deleteCard))
}

function* deleteContainer(token, action) {
  try {
    yield call(apiService.deleteContainer, token, action.payload)
    yield put(genericActionCreator(CONTAINER_DELETE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteContainer() {
  yield takeLatest(CONTAINER_DELETE_REQUEST, withToken(deleteContainer))
}

function* editContainer(token, action) {
  try {
    const response = yield call(apiService.editContainer, token, action.payload)
    yield put(genericActionCreator(CONTAINER_EDIT, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchEditContainer() {
  yield takeLatest(CONTAINER_EDIT_REQUEST, withToken(editContainer))
}

function* watchDragAndDrop() {
  const requestChannel = yield actionChannel('*')
  while (true) {
    const action = yield take(requestChannel)
    switch (action.type) {
      case CARD_MOVE_REQUEST: {
        yield call(withToken(moveCard), action)
        break
      }
      case CONTAINER_MOVE_REQUEST: {
        yield call(withToken(moveContainer), action)
        break
      }
      case CARD_MOVE_BETWEEN_CONTAINERS_REQUEST: {
        yield call(withToken(moveCardBetweenContainers), action)
        break
      }
      default:
        break
    }
  }
}

function* changeMembers(token, action) {
  try {
    const response = yield call(apiService.changeMembers, token, action.payload)
    yield put(genericActionCreator(BOARD_CHANGE_MEMBERS, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchChangeMembers() {
  yield takeLatest(BOARD_CHANGE_MEMBERS_REQUEST, withToken(changeMembers))
}

function* fetchBoardAndMembers(token, action) {
  try {
    const response = yield call(apiService.fetchBoardAndMembers, token, action.payload)
    yield put(genericActionCreator(BOARD_FETCH_BOARD_AND_MEMBERS, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchFetchBoardAndMembers() {
  yield takeLatest(BOARD_FETCH_BOARD_AND_MEMBERS_REQUEST, withToken(fetchBoardAndMembers))
}

export const boardSagas = [
  call(watchDragAndDrop),
  call(watchInitializeBoard),
  call(watchCreateContainer),
  call(watchCreateCard),
  call(watchEditCard),
  call(watchDeleteCard),
  call(watchEditContainer),
  call(watchDeleteContainer),
  call(watchChangeMembers),
  call(watchFetchBoardAndMembers)
]
