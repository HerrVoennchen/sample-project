import '#/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';

import 'bootstrap';

import fontawesome from '@fortawesome/fontawesome';
// import brands from '@fortawesome/fontawesome-free-brands';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faClone from '@fortawesome/fontawesome-free-solid/faClone';
// import far from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(faSync, faUsers, faClone);

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
