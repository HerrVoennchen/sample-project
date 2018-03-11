import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default props => (
    <ul className="fa-ul">
        <li>
            <span className="fa-li">
                <FontAwesomeIcon icon="clone" size="lg" fixedWidth />
            </span>
            <Link to="/posts">Posts</Link>
        </li>
        <li>
            <span className="fa-li">
                <FontAwesomeIcon icon="users" size="lg" fixedWidth />
            </span>
            <Link to="/users">Users</Link>
        </li>
    </ul>
);
