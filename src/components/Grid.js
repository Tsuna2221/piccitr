import React, { Component, Fragment } from 'react';
import Masonry from 'react-masonry-component';

import Details from './Details'
import GridItem from './GridItem'

class Grid extends Component {
    render() {
        let { selectedPost, isActive } = this.state
        let length = this.props.mediaEnable ? this.props.posts.filter(({data}) => data.preview.images[0].variants.gif).length : this.props.posts.length
        
        window.onresize = (e) => {
            let numOfColumns = Math.floor(((window.innerWidth * 80 / 100)) / 200)
            this.setState({...this.state, column: ((100 / numOfColumns) - 1), width: (e.currentTarget.innerWidth * 80 / 100) * ((100 / numOfColumns) - 1) / 100})
        }

        return (
            <Fragment>
                <div onClick={selectedPost.hide} className={`bg-overlay ${isActive ? 'active' : 'inactive'}`}></div>
                <Details length={length} moveItem={this.moveItem} post={selectedPost} isActive={isActive}></Details>
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
        column: ((100 / Math.floor(((window.innerWidth * 80 / 100)) / 200)) - 1),
    }

    drawPosts = () => {
        let posts = this.props.posts
        let { width, column } = this.state 
        let { NSFWEnable, GIFEnable, mediaEnable } = this.props
        let filteredPosts = mediaEnable ? posts.filter(({data}) => data.preview.images[0].variants.gif) : posts

        return filteredPosts.map(({data}, index) => {
            return (
                <GridItem
                    index={index}
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
        })
    }

    moveItem = (direction) => {
        let posts = this.props.posts
        let { props: { mediaEnable }, state: { selectedPost: { post: { index } } } } = this
        let filteredPosts = mediaEnable ? posts.filter(({data}) => data.preview.images[0].variants.gif) : posts
        let calc = direction === "right" ? index + 1 : index - 1

        if((direction === "left" && index === 0) || (direction === "right" && filteredPosts.length === calc)){
            return;
        }else{
            this.displayDetails({...filteredPosts[calc].data, index: calc})
        }
    }

    displayDetails = (post) => {
        this.setState({
            ...this.state,
            selectedPost: {
                post,
                hide: () => this.setState({...this.state, selectedPost: {post: {}}, isActive: false})
            },
            isActive: true
        })
    }

    toggleMobileOverlay = ({target: { dataset: {overlayid, id} }}) => {
        let el = s => document.querySelector(`[data-overlayid=${s}]`).classList.toggle('active')
        overlayid ? el(overlayid) : el(id)
    }
}

export default Grid;