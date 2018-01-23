import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
    <ul>
        <li>
            <Link to="/posts">Posts</Link>
        </li>
        <li>
            <Link to="/users">Users</Link>
        </li>
    </ul>
);
