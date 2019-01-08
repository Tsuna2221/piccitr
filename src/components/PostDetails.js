import React, { Component } from 'react';
import Close from "../assets/svg/CloseButton.svg";

//Styles
import '../styles/post-details.css'

class Details extends Component {
    render() {
        return (
            <div className={'details-container ' + this.props.postData.isActive}>
                <img onClick={this.props.hideOverlay} className="closeBtn" src={Close} alt="Close Button"/>

                <div id="details">
                    <div className="ref-links">
                        <a target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com' + this.props.postData.post.permalink}>Visit Post</a>
                        <a target="_blank" rel="noopener noreferrer" href={this.props.postData.post.url}>Visit Link</a>
                    </div>
                    
                    <a className="sub-name" target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/r/' + this.props.postData.post.subreddit}><h1>r/{this.props.postData.post.subreddit}</h1></a>
                    <p className="author-name">by: <a target="_blank" rel="noopener noreferrer" href={'https://www.reddit.com/u/' + this.props.postData.post.author}>u/{this.props.postData.post.author}</a> - from {this.props.postData.post.domain}</p>
                    <p className="title">{this.props.postData.post.title}</p>

                    <div className="embedded-cell">
                        {this.embedData(this.props.postData.post, this.state.handlers)}
                    </div>

                    <span className="stats">Upvotes ({this.props.postData.post.ups}) - Comments ({this.props.postData.post.num_comments})</span>
                </div>
            </div>
        );
    }

    state = {
        handlers: ['v.redd.it', 'gfycat.com', 'clips.twitch.tv', 'youtube.com', 'youtu.be', 'streamable.com', 'i.imgur.com', 'pornhub.com', 'youporn.com'],
    }

    embedData = (post, handler) => {
        if(!handler.includes(post.domain) && post.preview !== undefined){
            return <img src={post.preview.images[0].source.url} style={{width: '1500px'}} alt=""/>
    
        }else if(post.domain === 'i.imgur.com' && post.url.split('.').slice(-1)[0] === 'png'){
            return <img src={post.preview.images[0].source.url} style={{maxWidth: 'auto', width: '1500px' ,height: 'auto'}} alt=""/>

        }else if(post.domain === 'i.imgur.com' && post.url.split('.').slice(-1)[0] === 'jpg'){
            return <img src={post.preview.images[0].source.url} style={{maxWidth: 'auto', width: '1500px' ,height: 'auto'}} alt=""/>

        }else if(post.domain === 'i.imgur.com' && post.url.split('.').slice(-1)[0] === 'gifv'){
            return <video preload="auto" autoplay="autoPlay" muted="muted" loop="loop" style={{width: '1500px', maxHeight: '500px'}} webkit-playsinline=""><source src={'//i.imgur.com/'+ post.url.split('/').slice(-1)[0].split('.')[0] +'.mp4'} type="video/mp4"/></video>
        
        }else if(post.domain === 'youtube.com' || post.domain === 'youtu.be'){
            return <iframe className="youtube-embed" src={'https://www.youtube.com/embed/' + post.media.oembed.thumbnail_url.split('/')[4]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="youtube" allowFullScreen  style={{width: '1500px', maxHeight: 'auto', height: '1500px'}} ></iframe>
        
        }else switch(post.domain){
            case 'v.redd.it':
                return <video controls autoPlay loop src={post.secure_media.reddit_video.fallback_url} style={{width: '100%', height: '100%', maxHeight: '500px'}}></video> 

            case 'clips.twitch.tv':
                return <iframe className="twitch-embed" title="twitch" src={'https://clips.twitch.tv/embed?clip=' + post.url.split('/').slice(-1)[0]} frameBorder="0" allowFullScreen="true" width="1500px" height="300px"></iframe>                    

            case 'streamable.com':
                return <iframe className="stream-embed" title="stream" src={'https://streamable.com/s/' + post.url.split('/').slice(-1)[0]} frameBorder="0" width="1500px" height="300" allowFullScreen></iframe>  

            case 'gfycat.com':
                return <iframe className="gfycat-embed" title="gfycat" src={'https://gfycat.com/ifr/' + post.url.split('/').slice(-1)[0]} frameBorder='0'  allowFullScreen width="1500px" height= "300px"></iframe>
                
            case 'pornhub.com':
                return <iframe className="pornhub-embed" title="pornhub" src={'https://pt.pornhub.com/embed/' + post.url.split('?')[1].split('=')[1].split('&')[0]} frameBorder="0" width="1500px" allowFullScreen></iframe>

            case 'youporn.com':
                return <iframe className="youporn-embed" title="youporn" src={'https://www.youporn.com/embed/' + post.url.split('/')[4]} frameBorder="0" width='1500px' allowFullScreen></iframe>

            default:
                return null
        }
    }
}

export default Details;
