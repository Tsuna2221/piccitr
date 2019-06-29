import React, { Component } from 'react';
import { isMobile } from './Partials/varCheck';

class GridItem extends Component {
    ref = React.createRef()

    render() {
        let { data, NSFWEnable, width, column, displayDetails, toggleMobileOverlay, GIFEnable } = this.props
        let { preview, title, domain, subreddit_name_prefixed, over_18, name, ups, num_comments } = data
        let resVariant = preview.images[0].resolutions[1] ? preview.images[0].resolutions[1].url : preview.images[0].source.url
        let discount = (number, percentage) => number - (number * percentage / 100)
        let increase = (n, o) => ((o - n) * 100) / o

        return (
            <div 
                ref={this.ref}
                style={{width: column + "%", height: discount(preview.images[0].source.height, increase(width, preview.images[0].source.width))}} 
                key={name}
                className={`grid-item mar-2 bg-loading clickable overflow-y-hide ${isMobile ? 'mobile' : 'desktop'}`}
                onClick={isMobile ? null : () => displayDetails(data)}>
                <div onClick={isMobile ? toggleMobileOverlay : null} data-overlayid={name} className="overlay cw-100 ch-100">
                    <div className="details-stats d-flex c-white no-events pos-absolute">
                        <span className="stat-icon mdi mdi-arrow-up-bold mar-r-10"><span className="mar-l-4">{ups}</span></span>
                        <span className="stat-icon mdi mdi-comment"><span className="mar-l-4">{num_comments}</span></span>
                    </div>
                    <div className="details pad-10 c-white no-events">
                        <p className="sub w-bold mar-v-6">{subreddit_name_prefixed}</p>
                        <p className="title w-regular">{title.substr(0, 65)}</p>
                        <p className="domain w-medium mar-v-6">{domain}</p>
                    </div>
                </div>
                {
                    isMobile ? <span onClick={() => displayDetails(data)} className="DetailsButton mdi mdi-play c-white pos-absolute pad-10 s-20 br-circle"></span> : ""
                }
                {
                    GIFEnable && preview.images[0].variants.gif ? <span className="gif-indicator mdi mdi-filmstrip c-white pos-absolute pad-4 s-14 br-circle"></span> : ""
                }
                <img 
                    data-id={name} 
                    onClick={isMobile ? toggleMobileOverlay : null} 
                    className={`lazyload cw-100 ${!NSFWEnable && over_18 ? 'blurried' : ''}`} 
                    data-src={resVariant} 
                    alt=""
                />
            </div>
        );
    }

    state = {}

    async componentDidMount(){
        let { GIFEnable, data: {preview} } = this.props
        let resVariant = preview.images[0].resolutions[1] ? preview.images[0].resolutions[1].url : preview.images[0].source.url
        let gifVariant = GIFEnable && preview.images[0].variants.gif ? preview.images[0].variants.gif.source.url : resVariant

        const observer = new IntersectionObserver(
            ([{isIntersecting, intersectionRatio, target}]) => {

                if(!isIntersecting && target.children[2]){
                    target.children[2].src = resVariant
                }else{
                    if(intersectionRatio === 1 && target.children[2]){
                        target.children[2].src = gifVariant
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: [0.1, 0.5, 1.0]
            }
        )
        
        if(this.ref.current){
            observer.observe(this.ref.current)
        }
    }
}

export default GridItem;