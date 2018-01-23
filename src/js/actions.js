import axios from 'axios';
import config from 'config';
import { REQUEST_POSTS, REQUEST_USERS } from '@/constants';

/// easy way with redux thunk
export function fetchPosts() {
    return {
        type: REQUEST_POSTS,
        payload: axios.get('https://jsonplaceholder.typicode.com/posts')
    };
}

export function fetchUsers() {
    return {
        type: REQUEST_USERS,
        payload: new Promise((resolve, reject) => {
            /// Do some stuff, create objects etc.

            axios
                .get('https://jsonplaceholder.typicode.com/users')
                .then(response => response.data)
                .then(data => {
                    /// all fine here?
                    /// check check check

                    resolve(data);
                })
                .catch(error => {
                    console.error('Error while requesting users', error);
                    reject(error);
                });
        })
    };
}
