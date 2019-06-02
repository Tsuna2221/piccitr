import React from 'react';

const LoaderOverlay = (props) => {
    var loadState = props.isLoading ? 'active' : 'inactive'
    return (
        <div className={"LoaderOverlay " + loadState}>
            <div className='spinner'></div>
        </div>
    );
}

export default LoaderOverlay;