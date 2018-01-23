import React from 'react';

import Header from '@/Components/Header';

import { connect } from 'react-redux';
import { fetchPosts } from '@/actions';

class Posts extends React.Component {
    refreshData = () => {
        this.props.requestPosts();
    };

    componentDidMount() {
        let { posts, requestPosts } = this.props;
        if (!posts || posts.length === 0) {
            requestPosts();
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

export default connect(
    store => {
        return {
            isLoading: store.posts.pending,
            posts: store.posts.data
        };
    },
    {
        requestPosts: fetchPosts
    }
)(Posts);
