import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { rootReducer } from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'

export const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const middleware = [routerMiddleware(history), sagaMiddleware]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)

export default store
