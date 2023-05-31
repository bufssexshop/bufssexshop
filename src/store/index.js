import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { UserReducer } from './UserReducer';
import { SectionReducer } from './SectionReducer';
import { ProductReducer } from './ProductReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const appReducers = combineReducers({
  UserReducer,
  SectionReducer,
  ProductReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)