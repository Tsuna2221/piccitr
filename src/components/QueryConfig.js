import React, { Component } from 'react';
import { connect } from "react-redux";

//Styles
import '../styles/query-config.css'

class Config extends Component {
    render() {
        return (
            <div className={"config-container " + this.props.isActive}>
                <div className="opt-cell">
                    <div className="item-cell">
                        <span>Sort by:</span>
                        <ul>
                            <li><input onChange={this.handleChange} className="check-with-sortby" value="hot" name="sortby" type="radio" id="hot" defaultChecked/><label className="sortby-for-check" htmlFor="hot">Hot</label></li>
                            <li><input onChange={this.handleChange} className="check-with-sortby" value="new" name="sortby" type="radio" id="new"/><label className="sortby-for-check" htmlFor="new">New</label></li>
                            <li><input onChange={this.handleChange} className="check-with-sortby" value="rising" name="sortby" type="radio" id="rising"/><label className="sortby-for-check" htmlFor="rising">Rising</label></li>
                            <li><input onChange={this.handleChange} className="check-with-sortby" value="controversial" name="sortby" type="radio" id="controversial"/><label className="sortby-for-check" htmlFor="controversial">Controversial</label></li>
                            <li><input onChange={this.handleChange} className="check-with-sortby" value="top" name="sortby" type="radio" id="top"/><label className="sortby-for-check" htmlFor="top">Top</label></li>
                        </ul>
                    </div>
                    
                    <div style={{display: 'none'}} className="item-cell">
                        <span>Limit Image Draw nº:</span>
                        <ul>
                            <li><input type="text"/></li><span>Max 100 items (onKeyDown="sendSearch()") </span>
                        </ul>
                    </div>
                    
                </div>
            </div>
        );
    }
    state = {
        sortType: ''
    }
    handleChange = (e) => {
        this.props.updateQuery(e.target.value)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateQuery: (sortType) => {
            dispatch({type: 'UPDATE_SORT', sortBy: sortType})
        }
    }
}

export default connect(null, mapDispatchToProps)(Config);