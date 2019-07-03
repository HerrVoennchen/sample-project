import '#/styles/main.less';

import 'core-js';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

//import 'bootstrap';
import 'rmwc';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fab, fas, far);

import { Provider } from 'react-redux';
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
