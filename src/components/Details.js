import React, { useState, Fragment } from 'react';

import ImageDisplay from './ImageDisplay'
import { embedData } from './Partials/draw'
import { isMobile } from './Partials/varCheck'

const Details = ({post, isActive, moveItem, length}) => {
    let { title, subreddit, author, domain, ups, num_comments, permalink, url, created_utc, index } = post.post
    let { hide } = post
    let time = new Date(created_utc * 1000).toLocaleString()

    let [currentMedia, setMedia] = useState("")
    let [expanded, setExpanded] = useState(false)
    let [fullscreen, setFullscreen] = useState(false)
    
    let toggleFull = (image) => {
        setMedia(!fullscreen ? image : "")
        setFullscreen(!fullscreen)
    }
    
    window.onkeydown = ({keyCode}) => keyCode === 39 ? moveItem("right") : keyCode === 37 ? moveItem("left") : null  

    return !isMobile ?
    (
        <Fragment>
            <ImageDisplay media={currentMedia} visible={fullscreen} setFullscreen={toggleFull}/>
            <div className={`details-overlay c-white d-flex ch-fill pos-fixed bg-details z-index-100 overflow-y-scroll ${expanded ? "expand-active" : ""} ${isActive ? 'active' : 'inactive'}`}>
                <span onClick={hide} className="mdi mdi-close close c-white pad-8 br-circle clickable"></span>

                <div className="detail-data mar-v-cen cw-100">
                    <div className='detail-container'>
                        <div className="detail-buttons d-flex a-ver cw-100">
                            <a className="c-white s-21 w-bold mar-v-4" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/r/' + subreddit}>r/{subreddit}</a>
                            <div className="mar-l-40">
                                <a className="button" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com' + permalink}>Visit Post</a>
                                <a className="button" href={'./?r=' + subreddit}>View on Piccitr</a>
                                <a className="button" target="_blank" rel="noopener noreferrer" href={url}>Visit Link</a>
                            </div>
                        </div>
                        <p className="s-16 w-medium mar-v-6">by: <a className="c-white" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/u/' + author}>u/{author}</a> - from {domain} - <a className="c-white" href={"./?r=user/" + author}>at piccit</a></p>
                        <p className="s-14 mar-v-10">{title}</p>
                    </div>
                    <div className="d-flex a-between mar-b-6">
                        {
                            index === 0 ?
                                <div></div>
                            :
                                <span onClick={() => moveItem("left")} className="d-flex clickable s-14 a-vertical"><span className="mdi mdi-chevron-left s-20"></span>Previous Post (Left Key Arrow)</span>  
                        }
                        {
                            length === index + 1 ?
                                <div></div>
                            :
                                <span onClick={() => moveItem("right")} className="d-flex clickable s-14 a-vertical">(Right Key Arrow) Next Post<span className="mdi mdi-chevron-right s-20"></span></span>
                        }
                    </div>
                    <div className="pos-relative">
                        {
                            embedData(post.post) ?
                                <Fragment>
                                    {embedData(post.post).el}
                                    {
                                        embedData(post.post).type === "static" ?
                                            <span onClick={() => toggleFull(embedData(post.post).media)} className="mdi mdi-arrow-expand-all s-24 fullscreen-btn pos-absolute pad-8 br-circle clickable"></span>
                                        :
                                            null
                                    }
                                </Fragment>
                            :
                            null
                        }

                    </div>
                    <p className="stats mar-t-10">Upvotes ({ups}) - Comments ({num_comments}) - at {time}</p>
                </div>
                <div onClick={() => setExpanded(!expanded)} className="expand-btn d-flex a-vertical pos-fixed cw-100 clickable">
                    <span className="s-12 mar-r-6">{expanded ? "<< Collapse" : "Expand >>"}</span>
                </div>
            </div>
        </Fragment>
    )
    :
    (
        <div className={`mobile-overlay c-white d-flex ch-fill pos-fixed bg-details cw-50 pad-24 overflow-y-scroll ${isActive ? 'active' : 'inactive'}`}>
            <span onClick={hide} className="mdi mdi-close close c-white pad-8 br-circle clickable"></span>

            <div className="detail-data mar-v-cen cw-100">
                {embedData(post.post) ? embedData(post.post).el : null}
            </div>
        </div>
    )
}

export default Details;