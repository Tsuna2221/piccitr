import React from 'react';
import { isMobile } from './varCheck'

const embedData = ({domain, url, media, preview}) => {
    let iframe = (src) => <div className="iframe cw-100"><iframe title={domain} src={src} frameBorder='0' scrolling='no' width='100%' height={isMobile ? (window.innerHeight - 50) + 'px' : '500px'}></iframe></div>

    switch (domain) {
        case 'gfycat.com':
            return <video controls autoPlay loop src={preview.reddit_video_preview.fallback_url} style={{width: '100%', height: '100%', maxHeight: isMobile ? (window.innerHeight) + 'px' : '500px'}}></video> 
    
        case 'v.redd.it':
            return <video controls autoPlay loop src={url + "/DASH_360?source=fallback"} style={{width: '100%', height: '100%', maxHeight: isMobile ? (window.innerHeight) + 'px' : '500px'}}></video> 

        case 'clips.twitch.tv':
            var twitchString = url.split('/').slice(-1)[0]
            return iframe('https://clips.twitch.tv/embed?clip=' + twitchString)

        case 'youtu.be':
        case 'youtube.com':
            return iframe('https://www.youtube.com/embed/' + media.oembed.thumbnail_url.split('/')[4])

        case 'streamable.com':
            return iframe('https://streamable.com/s/' + url.split('/').slice(-1)[0])

        case 'i.imgur.com':
            if(url.includes('.gif')){
                if(url.includes('.gifv')){
                    return <video controls autoPlay loop src={url.replace('.gifv', '.mp4')} style={{width: '100%', height: '100%', maxHeight: '500px'}}></video> 
                }else{
                    return <div className="cw-100"><img src={url} alt="" width='100%'/></div>
                }
            }else{
                return <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>
            }

        case 'i.redd.it':
            if(url.includes('.gif')){
                return <div className="cw-100"><img src={url} alt="" width='100%'/></div>
            }
            return <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>

        case 'imgur.com':
            return <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>
        
        case 'pornhub.com':
            if(url.includes('photo')){
                return <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>
            }else{
                return iframe('https://pt.pornhub.com/embed/' + url.split('?')[1].split('=')[1].split('&')[0])
            }

        case 'youporn.com':
            return iframe('https://www.youporn.com/embed/' + url.split('/')[4])

        default:
            if(preview){
                if(url.includes('.gif')){
                    return <div className="cw-100"><img src={url} alt="" width='100%'/></div>
                }
                return <div className="cw-100"><img src={preview.images[0].source.url} alt="" width='100%'/></div>
            }
            break;
    }
}

export { embedData }