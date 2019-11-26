import React from 'react';

const MediaButton = ({ setMedia, MediaEnable }) => (
    <div onClick={setMedia} className={`toggler clickable d-flex br-circle ${MediaEnable ? 'inactive' : 'active'}`}>
        <div className="handler c-white"></div>
    </div>
)

export default MediaButton;