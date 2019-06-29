import React from 'react';

const NSFWButton = ({ setFilter, NSFWEnable }) => (
    <div onClick={setFilter} className={`toggler clickable d-flex br-circle ${NSFWEnable ? 'inactive' : 'active'}`}>
        <div className="handler c-white"></div>
    </div>
)

export default NSFWButton;