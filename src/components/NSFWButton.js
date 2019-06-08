import React from 'react';

const NSFWButton = (props) => {
    let { setFilter, NSFWEnable } = props
    return (
        <div onClick={setFilter} className={`NSFWButton clickable d-flex br-circle ${NSFWEnable ? 'inactive' : 'active'}`}>
            <div className="handler c-white"></div>
        </div>
    );
}

export default NSFWButton;