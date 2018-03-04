import '#/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'redux-zero/react';
import store from './store';

import Posts from '@/Pages/Posts';
import Users from '@/Pages/Users';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/posts" component={Posts} />
                <Route path="/users" component={Users} />

                <Route exact path="/">
                    <Redirect to="/posts" />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('App')
);
