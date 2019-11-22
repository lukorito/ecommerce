import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createPromise} from 'redux-promise-middleware';
import rootReducer from '../reducers';
import authMiddleware from '../middleware/authMiddleware';
import cartHandlerMiddleware from '../middleware/cartHandlerMiddleware'


const promiseTypeSuffixes = ['LOADING', 'SUCCESS', 'ERROR'];
const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = tool(applyMiddleware(thunk, logger, authMiddleware, cartHandlerMiddleware, createPromise({promiseTypeSuffixes})));
const store = createStore(rootReducer, middleware);


export default store;
