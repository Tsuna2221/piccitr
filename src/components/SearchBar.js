import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

//Styles
import '../styles/search-bar.css';

//Assets
import searchBtn from '../assets/svg/SubmitSearch.svg'
import settingBtn from '../assets/svg/SettingsButton.svg'

//Compontents
import Config from "./QueryConfig";

class SearchBar extends Component {
    render() {
        return (
            <div id='SearchBar'>
                <form onSubmit={this.redirectTo} id="search-cell">
                    <input id='subreddit-input' autoComplete="off" onChange={this.storeSubreddit} type="text" className="search-input" placeholder="Search subreddit..."/>
                    <img onClick={this.redirectTo} src={searchBtn} alt="none"/>
                    <img onClick={this.hideConfig} src={settingBtn} alt="none"/>
                </form>
                <Config isActive={this.state.isActive}/>
            </div>
        );
    }

    state = {
        isActive: 'inactive',
        subreddit: ''
    }
    
    hideConfig = () => {
        if(this.state.isActive === 'inactive'){
            this.setState({
                isActive: 'active'
            })
        }else{
            this.setState({
                isActive: 'inactive'
            })
        }
    }
    storeSubreddit = (e) => {
        var value = document.getElementById('subreddit-input').value
        this.props.updateQuery(value)
    }

    redirectTo = (e) => {
        var value = document.getElementById('subreddit-input').value
        var undSort = () => {
            if (this.props.query.sortBy === ''){
                return '&sort=hot'
            }else{
                return '&sort=' + this.props.query.sortBy
            }
        }

        if(value !== ''){
            e.preventDefault();
            window.location.href = '?r=' + this.props.query.subreddit + undSort()
        }
    }
}

const mapStateToProps = (state) => {
    return {
        query: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuery: (search) => {
            dispatch({type: 'UPDATE_SEARCH', subreddit: search})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));