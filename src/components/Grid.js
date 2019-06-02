import React, { Component, Fragment } from 'react';
import Masonry from 'react-masonry-component';

import Details from './Details'

class Grid extends Component {
    render() {
        let { selectedPost, isActive } = this.state
        return (
            <Fragment>
                <div onClick={selectedPost.hide} className={`bg-overlay ${isActive ? 'active' : 'inactive'}`}></div>
                <Details post={selectedPost} isActive={isActive}></Details>
                <div className='mar-h-cen' style={{width: '80vw'}}>
                    <Masonry id='posts-container'
                        elementType={'div'}
                        options={this.state.masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={true}>
                        {this.drawPosts()}
                    </Masonry>
                </div>
            </Fragment>
        );
    }

    state = {
        masonryOptions: {
            transitionDuration: 400
        },
        selectedPost: {post:{}},
        isActive: false
    }

    drawPosts = () => {
        let posts = this.props.posts
        let discount = (number, percentage) => number - (number * percentage / 100)
        let increase = (n, o) => ((o - n) * 100) / o

        return posts.map(({data}) => {
            let { preview, title, domain, subreddit_name_prefixed } = data
            return preview ?
            (<div 
                style={{width: "24%", height: discount(preview.images[0].source.height, increase(261.11, preview.images[0].source.width))}} 
                className="grid-item mar-2 bg-loading clickable overflow-y-hide"
                onClick={() => this.displayDetails(data)}>
                <div className="overlay cw-100 ch-100">
                    <div className="details pad-10 c-white">
                        <p className="w-bold mar-v-6">{subreddit_name_prefixed}</p>
                        <span className="w-regular s-14">{title.substr(0, 80)}</span>
                        <p className="w-medium mar-v-6 s-16">{domain}</p>
                    </div>
                </div>
                <img className="cw-100" src={preview.images[0].source.url} alt=""/>
             </div>)
            :
            ('')
        })
    }

    displayDetails = (post) => this.setState({
        ...this.state,
        selectedPost: {
            post,
            hide: () => this.setState({...this.state, isActive: false})
        },
        isActive: true
    })
}

export default Grid;