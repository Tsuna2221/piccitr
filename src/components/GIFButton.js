import React from 'react';

const GIFButton = ({ setGif, GIFEnable }) => (
    <div onClick={setGif} className={`toggler clickable d-flex br-circle ${GIFEnable ? 'inactive' : 'active'}`}>
        <div className="handler c-white"></div>
    </div>
)

export default GIFButton;