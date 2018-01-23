import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import reducers from './Reducers';
import config from 'config';

let middleware = undefined;
if (config.debug) {
    middleware = composeWithDevTools(applyMiddleware(promise(), thunk, createLogger()));
} else {
    middleware = applyMiddleware(promise(), thunk);
}

export default createStore(reducers, middleware);
