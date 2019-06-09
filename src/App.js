import React, { Component, Fragment } from 'react';
import Axios from 'axios';

//Components
import Grid from './components/Grid'
import LoaderOverlay from './components/LoaderOverlay'
import NSFWButton from './components/NSFWButton'
import { getQueryString } from './components/Partials/queryPartials'

class App extends Component {
    render() {
		let { isLoading, posts, NSFWEnable, isRefetching } = this.state

        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				if(!isRefetching){
					this.setState({isRefetching: true})
					this.refetch()
				}
            }
		};
		
        return (
            <div className='App'>
				{
					isLoading ?
					(<LoaderOverlay isLoading={isLoading}/> )
					:
					(<Fragment>
						<NSFWButton NSFWEnable={NSFWEnable} setFilter={this.setFilter}/>
						<Grid NSFWEnable={NSFWEnable} posts={posts}></Grid>
						{
							isRefetching ?
							<div className="d-flex a-horizontal mar-v-14">
								<div className="mini-spinner"></div>
							</div>
							:
							<div></div>
						}
					</Fragment> )
				}
            </div>
        );
    }

    state = {
		isLoading: true
	}

	componentDidMount = () => {
		let isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
		let { r, after, before } = getQueryString()
		let subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		let a = after ? `&after=${after}&count=${isMobile ? '30' : '100'}` : ""
		let b = before ? `&before=${before}` : ""
		let url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=${isMobile ? '30' : '100'}${a}${b}`

		if(localStorage.getItem('NSFWEnable') === 'false' || !localStorage.getItem('NSFWEnable')){
            this.setState({NSFWEnable: false})
        }else{
			this.setState({NSFWEnable: true})
		}

		Axios.get(url).then(({data:{data:{ after, before, children }}}) => this.setState({posts: children, after, before, isLoading: false}))
	}

	setFilter = () => {
        let { NSFWEnable } = this.state
        this.setState({NSFWEnable: !NSFWEnable})
        localStorage.setItem('NSFWEnable', !NSFWEnable)
    }
	
    refetch = () => {
		let isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
		let { r } = getQueryString()
		let subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		let { after } = this.state
		let url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=${isMobile ? '30' : '100'}&count=${isMobile ? '30' : '100'}&after=${after}`

		Axios.get(url).then(({data:{data:{ after, children }}}) => this.setState({posts: [...this.state.posts, ...children], after, isRefetching: false }))
    }
}

export default App;