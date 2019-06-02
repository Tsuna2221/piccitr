import React, { Component } from 'react';
import Axios from 'axios';

//Components
import Grid from './components/Grid'
import { getQueryString } from './components/Partials/queryPartials';

class App extends Component {
    render() {
		let { isLoading, posts, after, before, dist } = this.state

        return (
            <div className='App'>

				{
					isLoading ?
					(<div className="c-white">Loading</div>)
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
		let { r } = getQueryString()
		let subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		let url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=100`

		Axios.get(url).then(({data:{data:{ after, before, children, dist }}}) => this.setState({posts: children, after, before, total: dist, isLoading: false}))
	}
}

export default App;