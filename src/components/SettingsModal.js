import React, { Component, Fragment } from 'react';
import { isMobile } from './Partials/varCheck'

import NSFWButton from './NSFWButton'
import GIFButton from './GIFButton'
import MobileButton from './MobileButton'
import MediaButton from './MediaButton'

class SettingsModal extends Component {
    render() {
        let { props: {media:{mediaEnable, setMedia}, nsfw:{NSFWEnable, setFilter}, gif:{GIFEnable, setGif}, mobile: {mobileEnable, setMobile}}, state: {toggleSetting} } = this
        return (
            <Fragment>
                <div className={`SettingsModal z-index-100 d-flex ${toggleSetting ? "active" : "inactive"}`}>
                    <div className={`modal pad-18`}>
                        <div className="d-flex a-ver a-between">
                            <span className="s-14 c-white mar-r-10">NSFW</span>
                            <NSFWButton NSFWEnable={NSFWEnable} setFilter={setFilter}/>
                        </div>
                        <div className="d-flex a-ver a-between mar-t-14 br-medium">
                            <span className="s-14 c-white mar-r-10">Preview as GIF</span>
                            <GIFButton GIFEnable={GIFEnable} setGif={setGif}/>
                        </div>
                        <div className="d-flex a-ver a-between mar-t-14 br-medium">
                            <span className="s-14 c-white mar-r-10">Moblie Version</span>
                            <MobileButton MobileEnable={mobileEnable} setMobile={setMobile}/>
                        </div>
                        <div className="d-flex a-ver a-between mar-t-14 br-medium">
                            <span className="s-14 c-white mar-r-10">Video/GIF Only</span>
                            <MediaButton MediaEnable={mediaEnable} setMedia={setMedia}/>
                        </div>
                    </div>
                </div>
                <div>
                    <span onClick={() => this.setState({toggleSetting: !toggleSetting})} className={`SearchButton pos-fixed sett-btn mdi mdi-${toggleSetting ? "close" : "settings"} br-circle c-white cw-fit clickable sd-medium mar-t-14 ${isMobile ? 's-26 pad-14' : 's-22 pad-10'}`}></span>
                </div>
            </Fragment>
        );
    }

    state = {
        toggleSetting: false
    }
}

export default SettingsModal;