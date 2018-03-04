import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';
import { createLogger } from 'redux-logger';

const initialState = {
    posts: {
        pending: false,
        data: [],
        error: undefined
    },
    users: {
        pending: false,
        data: [],
        error: undefined
    }
};

const middlewares = connect ? applyMiddleware(connect(initialState)) : [];

export default createStore(initialState, middlewares);
