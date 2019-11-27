import React from 'react';

const ImageDisplay = ({media, visible, setFullscreen}) => (
    <div className={`ImageDisplay pos-fixed cw-max-view ch-max-view z-index-150 ${visible ? "active" : "inactive"}`}>
        <span onClick={setFullscreen} className="mdi mdi-close fullscreen-btn close s-24 c-white pad-8 mar-t-8 mar-r-12 br-circle clickable"></span>
        <img className="full-display" src={media}/>
    </div>
)

export default ImageDisplay;