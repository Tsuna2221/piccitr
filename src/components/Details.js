import React from 'react';
import { embedData } from './Partials/draw'

const Details = ({post, isActive}) => {
    let { title, subreddit, author, domain, ups, num_comments, permalink, url } = post.post
    let { hide } = post

    return (
        <div className={`details-overlay c-white d-flex ch-fill pos-fixed bg-details cw-50 z-index-100 pad-24 overflow-y-scroll ${isActive ? 'active' : 'inactive'}`}>
            <div className="close" onClick={hide}><span className="c-strong clickable">&times;</span></div>

            <div className="mar-v-cen cw-100">
                <div className="d-flex a-ver cw-100">
                    <a className="c-white s-21 w-bold mar-v-4" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/r/' + subreddit}>r/{subreddit}</a>
                    <div className="mar-l-40">
                        <a className="button" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com' + permalink}>Visit Post</a>
                        <a className="button" href={'./?r=' + subreddit}>View on Piccitr</a>
                        <a className="button" target="_blank" rel="noopener noreferrer" href={url}>Visit Link</a>
                    </div>
                </div>
                <p className="s-16 w-medium mar-v-6">by: <a className="c-white" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/u/' + author}>u/{author}</a> - from {domain} - <a className="c-white" href={"./?r=user/" + author}>at piccit</a></p>
                <p className="s-14 mar-v-10">{title}</p>
                {embedData(post.post)}
                <span className="stats">Upvotes ({ups}) - Comments ({num_comments})</span>
            </div>
        </div>
    );
}

export default Details;