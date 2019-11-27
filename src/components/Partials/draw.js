import React from 'react';
import { isMobile } from './varCheck'

const embedData = ({domain, url, media, preview}) => {
    let iframe = (src) => <div className="iframe cw-100"><iframe title={domain} src={src} frameBorder='0' scrolling='no' width='100%' height={isMobile ? (window.innerHeight - 50) + 'px' : '500px'}></iframe></div>

    switch (domain) {
        case 'gfycat.com':
            let src = preview.reddit_video_preview ? preview.reddit_video_preview.fallback_url : `https://giant.gfycat.com/${url.split('/').pop()}.mp4`
            return {
                el: <video controls autoPlay loop src={src} style={{width: '100%', height: '100%', maxHeight: isMobile ? (window.innerHeight) + 'px' : '500px'}}></video>,
                type: "video",
            }
    
        case 'v.redd.it':
            return {
                el: <video controls autoPlay loop src={url + "/DASH_360?source=fallback"} style={{width: '100%', height: '100%', maxHeight: isMobile ? (window.innerHeight) + 'px' : '500px'}}></video>,
                type: "video",
            }

        case 'clips.twitch.tv':
            var twitchString = url.split('/').slice(-1)[0]
            return {
                el: iframe('https://clips.twitch.tv/embed?clip=' + twitchString),
                type: "video",
            }

        case 'youtu.be':
        case 'youtube.com':
            return {
                el: iframe('https://www.youtube.com/embed/' + media.oembed.thumbnail_url.split('/')[4]),
                type: "video",
            }

        case 'streamable.com':
            return {
                el: iframe('https://streamable.com/s/' + url.split('/').slice(-1)[0]),
                type: "video"
            }

        case 'i.imgur.com':
            if(url.includes('.gif')){
                if(url.includes('.gifv')){
                    return {
                        el: <video controls autoPlay loop src={url.replace('.gifv', '.mp4')} style={{width: '100%', height: '100%', maxHeight: '500px'}}></video>,
                        type: "video"
                    }
                }else{
                    return {
                        el: <div className="cw-100"><img src={url} alt="" width='100%'/></div>,
                        type: "static",
                        media: url
                    }
                }
            }else{
                return {
                    el: <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>,
                    type: "static",
                    media: preview.images[0].source.url
                }
            }

        case 'i.redd.it':
            if(url.includes('.gif')){
                return {
                    el: <div className="cw-100"><img src={url} alt="" width='100%'/></div>,
                    type: "static",
                    media: url
                }
            }
            return {
                el: <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>,
                type: "static",
                media: preview.images[0].source.url
            }

        case 'imgur.com':
            return {
                el: <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>,
                type: "static",
                media: preview.images[0].source.url
            }
        
        case 'pornhub.com':
            if(url.includes('photo')){
                return {
                    el: <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>,
                    type: "static",
                    media: preview.images[0].source.url
                }
            }else{
                return {
                    el: iframe('https://pt.pornhub.com/embed/' + url.split('?')[1].split('=')[1].split('&')[0]),
                    type: "video"
                }
            }

        default:
            if(preview){
                if(url.includes('.gif')){
                    return {
                        el: <div className="cw-100"><img src={url} alt="" width='100%'/></div>,
                        type: "static",
                        media: url
                    }
                }
                return {
                    el: <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>,
                    type: "static",
                    media: preview.images[0].source.url
                }
            }
            break;
    }
}

export { embedData }