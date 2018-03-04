import React from 'react';

import Header from '@/Components/Header';

import { connect } from 'redux-zero/react';
import actions from '@/actions';

class Users extends React.PureComponent {
    refreshData = () => {
        this.props.fetchUsers();
    };

    componentDidMount() {
        let { users, fetchUsers } = this.props;
        if (!users || users.length === 0) {
            fetchUsers();
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
                <button onClick={this.refreshData}>refresh</button>
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

export default connect(store => {
    return {
        isLoading: store.users.pending,
        users: store.users.data
    };
}, actions)(Users);
