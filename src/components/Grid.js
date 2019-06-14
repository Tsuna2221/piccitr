import React, { Component, Fragment } from 'react';
import Masonry from 'react-masonry-component';

import Details from './Details'
import { isMobile } from './Partials/varCheck';

class Grid extends Component {
    render() {
        let { selectedPost, isActive } = this.state
        window.onresize = (e) => {
            let numOfColumns = Math.floor(((window.innerWidth * 80 / 100)) / 200)
            this.setState({...this.state, column: ((100 / numOfColumns) - 1), width: (e.currentTarget.innerWidth * 80 / 100) * ((100 / numOfColumns) - 1) / 100})
        }

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
        isActive: false,
        width: (window.innerWidth * 80 / 100) * ((100 / Math.floor(((window.innerWidth * 80 / 100)) / 200)) - 1) / 100,
        column: ((100 / Math.floor(((window.innerWidth * 80 / 100)) / 200)) - 1)
    }

    drawPosts = () => {
        let posts = this.props.posts
        let { width, column } = this.state 
        let { NSFWEnable } = this.props

        let discount = (number, percentage) => number - (number * percentage / 100)
        let increase = (n, o) => ((o - n) * 100) / o

        return posts.map(({data}) => {
            let { preview, title, domain, subreddit_name_prefixed, over_18, name } = data
            if(preview){
                let resVariant = preview.images[0].resolutions[1] ? preview.images[0].resolutions[1].url : preview.images[0].source.url

                return (<div 
                    style={{width: column + "%", height: discount(preview.images[0].source.height, increase(width, preview.images[0].source.width))}} 
                    key={name}
                    className={`grid-item mar-2 bg-loading clickable overflow-y-hide ${isMobile ? 'mobile' : 'desktop'}`}
                    onClick={isMobile ? null : () => this.displayDetails(data)}>
                    <div onClick={isMobile ? this.toggleMobileOverlay : null} data-overlayid={name} className="overlay cw-100 ch-100">
                        <div className="details pad-10 c-white no-events">
                            <p className="sub w-bold mar-v-6 rs-medium">{subreddit_name_prefixed}</p>
                            <p className="title w-regular rs-low">{title.substr(0, 80)}</p>
                            <p className="domain w-medium mar-v-6 rs-medium">{domain}</p>
                        </div>
                    </div>
                    {
                        isMobile ? <span onClick={() => this.displayDetails(data)} className="DetailsButton mdi mdi-eye c-white pos-absolute pad-8 br-circle"></span> : ""
                    }
                    <img data-id={name} onClick={isMobile ? this.toggleMobileOverlay : null} className={`lazyload cw-100 ${!NSFWEnable && over_18 ? 'blurried' : ''}`} data-src={resVariant} alt=""/>
                 </div>)
            }
            return '';
        })
    }

    displayDetails = (post) => this.setState({
        ...this.state,
        selectedPost: {
            post,
            hide: () => this.setState({...this.state, selectedPost: {post: {}}, isActive: false})
        },
        isActive: true
    })

    toggleMobileOverlay = ({target: { dataset: {overlayid, id} }}) => {
        let el = s => document.querySelector(`[data-overlayid=${s}]`).classList.toggle('active')
        overlayid ? el(overlayid) : el(id)
    }
}

export default Grid;