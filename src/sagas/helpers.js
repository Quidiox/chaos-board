import { call, select } from 'redux-saga/effects'
import { getToken } from '../selectors/selectors'

export const withToken = saga => {
  return function*(action) {
    let token = yield select(getToken)
    token = `Bearer ${token}`
    yield call(saga, token, action)
  }
}
