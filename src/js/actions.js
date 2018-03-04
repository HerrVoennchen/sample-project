import axios from 'axios';
import config from 'config';

const actions = store => ({
    fetchPosts: state => {
        store.setState({ ...state, posts: { ...state.posts, pending: true } });

        return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.data)
            .then(data => {
                setTimeout(() => store.setState({ ...state, posts: { ...state.posts, pending: false, data: data } }), 1000);
            })
            .catch(error => {
                store.setState({ ...state, posts: { ...state.posts, pending: false, error: error } });
            });
    },
    fetchUsers: state => {
        store.setState({ ...state, users: { ...state.users, pending: true } });

        return axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(res => res.data)
            .then(data => {
                setTimeout(() => store.setState({ ...state, users: { ...state.users, pending: false, data: data } }), 1000);
            })
            .catch(error => {
                store.setState({ ...state, users: { ...state.users, pending: false, error: error } });
            });
    }
});

export default actions;
