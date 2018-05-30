import { call, put, takeLatest, actionChannel, take } from 'redux-saga/effects'
import { genericActionCreator } from '../reducers/rootReducer'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT,
  USER_VERIFY_TOKEN_REQUEST,
  USER_VERIFY_TOKEN,
  USER_CREATE_REQUEST,
  USER_CREATE,
  USER_DELETE_REQUEST,
  USER_DELETE,
  USER_EDIT_REQUEST,
  USER_EDIT
} from '../reducers/actionTypes'
import apiService from '../api/userApiService'

function* login(action) {
  try {
    const token = yield call(apiService.login, action.payload)
    yield put(genericActionCreator(USER_LOGIN, token))
  } catch (error) {
    console.log(error)
  }
}

function* watchLogin() {
  yield takeLatest(USER_LOGIN_REQUEST, login)
}

function* logout() {
  try {
    yield put(genericActionCreator(USER_LOGOUT))
  } catch (error) {
    console.log(error)
  }
}

function* watchLogout() {
  yield takeLatest(USER_LOGOUT_REQUEST, logout)
}

export const userSagas = [call(watchLogin), call(watchLogout)]
