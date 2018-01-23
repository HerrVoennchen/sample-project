import { combineReducers } from 'redux';
import Posts from './posts';
import Users from './users';

export default combineReducers({
    posts: Posts,
    users: Users
});
