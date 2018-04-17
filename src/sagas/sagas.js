import { call, put, takeLatest, all } from 'redux-saga/effects'
import { BOARD_INITIALIZE_REQUEST } from '../reducers/actionTypes'
import apiService from '../api/apiService'
import { initializeBoard } from '../reducers/boardReducer'

function* getContainers() {
  try {
    const containers = yield call(apiService.fetchAllContainers)
    yield put(initializeBoard(containers))
  } catch (error) {
    console.log(error)
  }
}

function* watchGetContainers() {
  yield takeLatest(BOARD_INITIALIZE_REQUEST, getContainers)
}

export default function* rootSaga() {
  yield all([call(watchGetContainers)])
}
