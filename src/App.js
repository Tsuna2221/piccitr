import React, { Component } from 'react';
import Axios from 'axios';

//Components
import Grid from './components/Grid'
import LoaderOverlay from './components/LoaderOverlay'
import { getQueryString } from './components/Partials/queryPartials'

class App extends Component {
    render() {
		let { isLoading, posts } = this.state

        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				this.refetch()
            }
		};
		
        return (
            <div className='App'>
				{
					isLoading ?
					(<LoaderOverlay isLoading={isLoading}/> )
					:
					(<Grid posts={posts}></Grid>)
				}
            </div>
        );
    }

    state = {
		isLoading: true
	}
	
	componentDidMount = () => {
		var { r, after, before } = getQueryString()
		var subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		var a = after ? `&after=${after}&count=100` : ""
		var b = before ? `&before=${before}` : ""
		var url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=100${a}${b}`

		Axios.get(url).then(({data:{data:{ after, before, children }}}) => this.setState({posts: children, after, before, isLoading: false}))
	}

	
    refetch = () => {
		var { r } = getQueryString()
		var subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		var { after } = this.state
		var url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=100&count=100&after=${after}`

		Axios.get(url).then(({data:{data:{ after, children }}}) => this.setState({posts: [...this.state.posts, ...children], after }))
    }
}

export default App;