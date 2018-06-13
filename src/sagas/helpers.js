import { call, select } from 'redux-saga/effects'
import { getToken, getFrom } from './selectors'

export const withToken = saga => {
  return function*(action) {
    let token = yield select(getToken)
    token = `Bearer ${token}`
    yield call(saga, token, action)
  }
}

export function* getRedirectPath() {
  return yield select(getFrom)
}
