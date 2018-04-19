import { call, put, takeLatest, all } from 'redux-saga/effects'
import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CARD_MOVE,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE
} from '../reducers/actionTypes'
import apiService from '../api/apiService'
import { genericActionCreater } from '../reducers/boardReducer'

function* initializeBoard() {
  try {
    const containers = yield call(apiService.fetchAllContainers)
    yield put(genericActionCreater(BOARD_INITIALIZE, containers))
  } catch (error) {
    console.log(error)
  }
}

function* watchInitializeBoard() {
  yield takeLatest(BOARD_INITIALIZE_REQUEST, initializeBoard)
}

function* moveCard(action) {
  try {
    const meta = {...action.meta}
    console.log('moveCard saga: ', meta)
    const response = yield call(apiService.changeCardOrder, meta)
    console.log('move card response: ', meta)
    yield put(genericActionCreater(CARD_MOVE, null, null, meta))
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveCard() {
  yield takeLatest(CARD_MOVE_REQUEST, moveCard)
}

function* moveContainer(action) {
  try {
    const meta = {...action.meta}
    console.log('containerSaga meta: ', meta)
    const response = yield call(apiService.changeContainerOrder, meta)
    yield put(genericActionCreater(CONTAINER_MOVE, null, null, meta))
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveContainer() {
  yield takeLatest(CONTAINER_MOVE_REQUEST, moveContainer)
}

export default function* rootSaga() {
  yield all([
    call(watchInitializeBoard),
    call(watchMoveCard),
    call(watchMoveContainer)
  ])
}
