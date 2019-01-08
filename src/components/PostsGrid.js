import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import randomColor from 'randomcolor';
import Arrow from '../assets/svg/Arrow.svg'
import Details from './PostDetails'
import axios from "axios";
import qs from 'query-string'

//Components

//Styles
import '../styles/posts-grid.css'


class PostsGrid extends Component {
    render() {
        //HTML Set -- Posts
        const postsData = this.state.posts.map(post => {
            var { name, is_self, preview, subreddit, title, domain } = post.data

            if(!is_self && preview !== undefined){
                return (
                    <div key={name} className="post-cell">
                        <div className="image">
                            <span className="flag data-type" style={{backgroundColor: randomColor({luminosity: 'dark', format: 'rgba', alpha: 0.8 })}}>
                                {this.dataType(post.data)} 
                            </span>
                            
                            {this.NSFWFlag(post.data)}

                            {this.checkXPost(post.data)}
                            
                        </div>
                        <div className="post-overlay" onClick={() => this.showOverlay(post.data)} style={{backgroundColor: randomColor({luminosity: 'dark', format: 'rgba', alpha: 0.8 })}}>
                            <div className="post-details">
                                <h1>r/{subreddit}</h1>
                                <span>{title.substr(0, 80)}...</span>
                                <h2>{domain}</h2>
                            </div>
                        </div>
                    </div>              
                )
            }
            return null;
        })
        
        return (
            <div id="main-container">
                <div onClick={this.setNSFWCheck} className={'switch-btn switch-' + document.cookie.split('=').slice(-1)[0]}>
                    <div className={'slider slide-' + document.cookie.split('=').slice(-1)[0]}></div>
                    <span className='switch-note'>NSFW</span>
                </div>
                <p className="error-message">{this.state.errorMsg}</p>
                <Details postData={this.state.selectedData} hideOverlay={this.hideOverlay} />
                <img onClick={this.goPreviousPage} src={Arrow} alt="Previous Page" className={'previous-btn arrow ' + this.state.visibleArrow}/>
                <img onClick={this.goNextPage} src={Arrow} alt="Next Page" className={'next-btn arrow ' + this.state.visibleArrow}/>
                <Masonry id='posts-container'
                    elementType={'div'}
                    options={this.state.masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={true}>
                    {postsData}
                </Masonry>
            </div>
            
        );
    }
    
    state = {
        posts: [],
        url: 'https://www.reddit.com/r/all.json?raw_json=1&limit=65' + this.props.location.search.replace('?', '&'),
        masonryOptions: {
            transitionDuration: 400
        },
        selectedData: {
            isActive: 'inactive',
            post: {}
        },
        visibleArrow: 'invisible',
        errorMsg: '',
    }

    componentDidMount = () => {
        var errorMsg = 'Could not retrieve posts. Please, try again.'
        var query = qs.parse(this.props.location.search)
        var undSort = () => {
            if (query.sort === undefined){
                return 'hot'
            }else{
                return query.sort
            }
        }

        if(query.r !== undefined && query.sort === undefined){
            window.location.href = '/piccitr/?r=' + query.r + '&sort=hot'
        }

        if(query.r === undefined){
            if(query.sort === 'undefined'){
                window.location.href = '/piccitr/?r=' + query.r
            }
            axios.get(this.state.url).then().then(res => {this.setState({posts: res.data.data.children, visibleArrow: 'visible'}); this.isEmptyFetch(res.data.data.children)}).catch(() => this.setState({errorMsg: errorMsg}))
        }else{
            axios.get('https://www.reddit.com/r/'+ query.r + '/' + undSort() +'.json?raw_json=1&limit=65' + this.props.location.search.replace('?', '&')).then(res => {this.setState({posts: res.data.data.children, visibleArrow: 'visible'}); this.isEmptyFetch(res.data.data.children)}).catch(() => this.setState({errorMsg: errorMsg}))
        }
    }

    checkXPost = (data) => {
        if(data.crosspost_parent_list === undefined){
            return <img src={data.preview.images[0].source.url} className={'image-cell ' + this.isNSFW(data)} alt={'Post:' + data.title.substr(0, 20)}/>
        }
    } 

    isEmptyFetch = (query) => {
        var subreddit = qs.parse(this.props.location.search).r
        if(query.length < 1){
            if(subreddit === undefined){
                window.location.href = '/piccitr'
            }else{
                window.location.href = '/piccitr/?r=' + subreddit
            }
        }
    }

    goPreviousPage = () => {
        var postId = this.state.posts[0].data.name;
        var query = qs.parse(this.props.location.search)

        if(query.r === undefined){
            window.location.href = '?before=' + postId;
        }else{
            window.location.href = '?r=' + query.r + '&sort=' + query.sort + '&before=' + postId;
        }
        
    }

    goNextPage = () => {
        var postId = this.state.posts.slice(-1)[0].data.name;
        var query = qs.parse(this.props.location.search)

        if(query.r === undefined){
            window.location.href = '?after=' + postId;
        }else{
            window.location.href = '?r=' + query.r + '&sort=' + query.sort + '&after=' + postId;
        }
    }

    showOverlay = (data) => {
        this.setState({
            selectedData: {
                isActive: 'active',
                post: data
            }
        })
    }

    hideOverlay = () => {
        this.setState({
            selectedData: {
                isActive: 'inactive',
                post: ''
            }
        })
    }

    isNSFW = (data) => {
        if(data.over_18 === true && document.cookie.split('=').slice(-1)[0] === 'inactive'){
            return 'blur'
        }else{
            return ''
        }
    }

    setNSFWCheck = () => { 
        if(document.cookie === 'hideNSFW=active'){
            document.cookie = 'hideNSFW=inactive'   
        }else{
            document.cookie = 'hideNSFW=active'
        }

        window.location.reload()
    }

    NSFWFlag = (data) => {
        if(data.over_18 === true){
            return (
                <span className="flag nsfw" style={{backgroundColor: '#9e2f2fcc'}}>nsfw</span>
            )
        }else{
            return ''
        }
    }

    dataType = (data) => {
        const url = data.url.split('.').slice(-1)[0]
        const conditions = {
            image: ['i.redd.it', 'imgur.com'],
            video: ['v.redd.it', 'youtu.be', 'youtube.com', 'clips.twitch.tv', 'streamable.com', 'pornhub.com', 'youporn.com'],
            gif: ['gfycat.com',]
        }

        if(conditions.gif.includes(data.domain)){
            return 'gif'

        }else if(conditions.video.includes(data.domain)){
            return 'video'

        }else if(conditions.image.includes(data.domain)){
            return 'image'

        }else switch(url){
            case 'gifv':
                return 'gif'

            case 'gif':
                return 'gif'

            case 'jpg':
                return 'image'
                
            case 'png':
                return 'image'

            default:
                return 'ex-img'
        }
    }
}

export default PostsGrid;