import { call, put, takeLatest } from 'redux-saga/effects'
import { genericActionCreator } from '../reducers/rootReducer'
import { USER_GET_ALL, USER_GET_ALL_REQUEST } from '../reducers/actionTypes'
import apiService from '../api/usersApiService'
import { withToken } from './helpers'

function* getAllUsers(token) {
  try {
    const response = yield call(apiService.getAllUsers, token)
    yield put(genericActionCreator(USER_GET_ALL, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchGetAllUsers() {
  yield takeLatest(USER_GET_ALL_REQUEST, withToken(getAllUsers))
}

export const usersSagas = [call(watchGetAllUsers)]
