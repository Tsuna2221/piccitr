import React, { Component, Fragment } from 'react';
import Masonry from 'react-masonry-component';

import Details from './Details'
import GridItem from './GridItem'

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
        let { NSFWEnable, GIFEnable } = this.props
        
        return posts.map(({data}) => {
            if(data.preview){
                return (
                    <GridItem 
                        key={data.name} 
                        data={data} 
                        NSFWEnable={NSFWEnable} 
                        GIFEnable={GIFEnable}
                        width={width} 
                        column={column} 
                        displayDetails={this.displayDetails} 
                        toggleMobileOverlay={this.toggleMobileOverlay}
                    />
                )
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