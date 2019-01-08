import React from 'react'
import qs from 'query-string'

const checkXPost = (data) => {
    if(data.crosspost_parent_list === undefined){
        return <img src={data.preview.images[0].source.url} className={'image-cell ' + isNSFW(data)} alt={'Post:' + data.title.substr(0, 20)}/>
    }
} 

const isEmptyFetch = (query) => {
    var subreddit = qs.parseUrl(document.URL).query.r
    if(query.length < 1){
        if(subreddit === undefined){
            window.location.href = '/piccitr'
        }else{
            window.location.href = '/piccitr/?r=' + subreddit
        }
    }
}

const goPreviousPage = (state, props) => {
    var postId = state.posts[0].data.name;
    var query = qs.parse(props.location.search)

    if(query.r === undefined){
        window.location.href = '?before=' + postId;
    }else{
        window.location.href = '?r=' + query.r + '&sort=' + query.sort + '&before=' + postId;
    }
    
}

const goNextPage = (state, props) => {
    var postId = state.posts.slice(-1)[0].data.name;
    var query = qs.parse(props.location.search)

    if(query.r === undefined){
        window.location.href = '?after=' + postId;
    }else{
        window.location.href = '?r=' + query.r + '&sort=' + query.sort + '&after=' + postId;
    }
}

const showOverlay = (data) => {
    this.setState({
        selectedData: {
            isActive: 'active',
            post: data
        }
    })
}

const hideOverlay = () => {
    this.setState({
        selectedData: {
            isActive: 'inactive',
            post: ''
        }
    })
}

const isNSFW = (data) => {
    if(data.over_18 === true && document.cookie.split('=').slice(-1)[0] === 'inactive'){
        return 'blur'
    }else{
        return ''
    }
}

const setNSFWCheck = () => { 
    if(document.cookie === 'hideNSFW=active'){
        document.cookie = 'hideNSFW=inactive'   
    }else{
        document.cookie = 'hideNSFW=active'
    }

    window.location.reload()
}

const NSFWFlag = (data) => {
    if(data.over_18 === true){
        return (
            <span className="flag nsfw" style={{backgroundColor: '#9e2f2fcc'}}>nsfw</span>
        )
    }else{
        return ''
    }
}

export { checkXPost, isEmptyFetch, goPreviousPage, goNextPage, showOverlay, hideOverlay, setNSFWCheck, NSFWFlag }