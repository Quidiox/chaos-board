import { call, put, takeLatest } from 'redux-saga/effects'
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
import { withToken } from './helpers'

function* login(action) {
  try {
    const user = yield call(apiService.login, action.payload)
    yield put(genericActionCreator(USER_LOGIN, user))
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

function* verifyToken(action) {
  try {
    const response = yield call(apiService.verifyToken, action.payload)
    if (response && response.success) {
      yield put(genericActionCreator(USER_VERIFY_TOKEN, action.payload))
    }
  } catch (error) {
    console.log(error)
  }
}

function* watchVerifyToken() {
  yield takeLatest(USER_VERIFY_TOKEN_REQUEST, verifyToken)
}

function* createUser(action) {
  try {
    const user = yield call(apiService.create, action.payload)
    yield put(genericActionCreator(USER_CREATE, user))
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateUser() {
  yield takeLatest(USER_CREATE_REQUEST, createUser)
}

function* editUser(token, action) {
  try {
    const editedUser = yield call(apiService.edit, token, action.payload)
    yield put(genericActionCreator(USER_EDIT, editedUser))
  } catch (error) {
    console.log(error)
  }
}

function* watchEditUser() {
  yield takeLatest(USER_EDIT_REQUEST, withToken(editUser))
}

function* deleteUser(token, action) {
  try {
    yield call(apiService.remove, token, action.payload)
    yield put(genericActionCreator(USER_DELETE))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteUser() {
  yield takeLatest(USER_DELETE_REQUEST, withToken(deleteUser))
}

export const userSagas = [
  call(watchLogin),
  call(watchLogout),
  call(watchVerifyToken),
  call(watchCreateUser),
  call(watchEditUser),
  call(watchDeleteUser)
]
