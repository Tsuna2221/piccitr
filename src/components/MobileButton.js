import React from 'react';

const MobileButton = ({ setMobile, MobileEnable }) => (
    <div onClick={setMobile} className={`toggler clickable d-flex br-circle ${MobileEnable ? 'inactive' : 'active'}`}>
        <div className="handler c-white"></div>
    </div>
)

export default MobileButton;