import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Header from '@/Components/Header';

import { connect } from 'react-redux';
import { fetchUsers } from '@/actions';

class Users extends React.Component {
    refreshData = () => {
        this.props.requestUsers();
    };

    componentDidMount() {
        let { users, requestUsers } = this.props;
        if (!users || users.length === 0) {
            requestUsers();
        }
    }

    render() {
        let { isLoading, users } = this.props;
        let content = '';

        if (users) {
            content = users.map(item => <li key={item.id}>{item.name}</li>);
            content = <ul>{content}</ul>;
        }

        return [
            <Header key="header" />,
            <div key="content">
                <h1>Users</h1>
                <button className="btn" onClick={this.refreshData}>
                    <FontAwesomeIcon icon="sync" size="xs" fixedWidth />
                </button>
                {isLoading && (
                    <ul>
                        <li>loading ...</li>
                    </ul>
                )}
                {!isLoading && content}
            </div>
        ];
    }
}

export default connect(
    store => {
        return {
            isLoading: store.users.pending,
            users: store.users.data
        };
    },
    {
        requestUsers: fetchUsers
    }
)(Users);
