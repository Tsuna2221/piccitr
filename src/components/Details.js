import React, { Component } from 'react';
import { embedData } from './Partials/draw'

class Details extends Component {
    render() {
        let { title, subreddit, author, domain, ups, num_comments } = this.props.post.post
        return (
            <div onClick={this.click} className="c-white d-flex ch-fill pos-fixed bg-details cw-50 z-index-100 pad-24 overflow-y-scroll">
                <div className="mar-v-cen">
                    <a className="c-white" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/r/' + subreddit}><h1 className="s-21 w-bold mar-v-4">r/{subreddit}</h1></a>
                    <p className="s-16 w-medium mar-v-6">by: <a className="c-white" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/u/' + author}>u/{author}</a> - from {domain}</p>
                    <p className="s-14 mar-v-10">{title}</p>
                    {embedData(this.props.post.post)}
                    <span className="stats">Upvotes ({ups}) - Comments ({num_comments})</span>
                </div>
            </div>
        );
    }

    state = {

    }
}

export default Details;