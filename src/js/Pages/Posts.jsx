import React from 'react';

import Header from '@/Components/Header';

import { connect } from 'redux-zero/react';
import actions from '@/actions';

class Posts extends React.PureComponent {
    refreshData = () => {
        this.props.fetchPosts();
    };

    componentDidMount() {
        let { posts, fetchPosts } = this.props;
        if (!posts || posts.length === 0) {
            fetchPosts();
        }
    }

    render() {
        let { isLoading, posts } = this.props;
        let content = '';

        if (posts) {
            content = posts.map(item => <li key={item.id}>{item.title}</li>);
            content = <ul>{content}</ul>;
        }

        return [
            <Header key="header" />,
            <div key="content">
                <h1>Posts</h1>
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
        isLoading: store.posts.pending,
        posts: store.posts.data
    };
}, actions)(Posts);
