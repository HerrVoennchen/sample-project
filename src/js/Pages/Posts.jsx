import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '@/Components/Header';
import Loading from '@/Components/Loading';

import { connect } from 'react-redux';
import { fetchPosts } from '@/actions';

import { Button } from 'antd';

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
            <div className="content mdc-theme--background">
                <h1>Posts</h1>
                <Button type="primary" onClick={this.refreshData}>
                    <FontAwesomeIcon icon="sync" size="xs" fixedWidth />
                </Button>
                {isLoading && <Loading />}
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
