import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootSaga from './sagas/sagas'
import boardRecuder from './reducers/boardReducer'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const middleware = [routerMiddleware(history), sagaMiddleware]

const store = createStore(
  combineReducers({ board: boardRecuder, router: routerReducer }),
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export default store
