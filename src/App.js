import React, { Component, Fragment } from 'react';
import Axios from 'axios';

//Partial
import { isMobile } from './components/Partials/varCheck'

//Components
import Grid from './components/Grid'
import LoaderOverlay from './components/LoaderOverlay'
import SearchButton from './components/SearchButton'
import { getQueryString } from './components/Partials/queryPartials'
import SettingsModal from './components/SettingsModal'

class App extends Component {
    render() {
		let { isLoading, posts, NSFWEnable, GIFEnable, isRefetching } = this.state

        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
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
						<SearchButton NSFWEnable={NSFWEnable}/>
						<SettingsModal nsfw={{NSFWEnable, setFilter: this.setFilter}} gif={{GIFEnable, setGif: this.setGif}} />
						<Grid GIFEnable={GIFEnable} NSFWEnable={NSFWEnable} posts={posts}></Grid>
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
		isLoading: true,

	}

	componentDidMount = () => {
		let { r, limit } = getQueryString()
		let subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		let url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=${isMobile ? limit ? limit : '50' : limit ? limit : '100'}`

		if(localStorage.getItem('NSFWEnable') === 'false' || !localStorage.getItem('NSFWEnable')){
            this.setState({NSFWEnable: false})
        }else{
			this.setState({NSFWEnable: true})
		}

		if(localStorage.getItem('GIFEnable') === 'false' || !localStorage.getItem('GIFEnable')){
            this.setState({GIFEnable: false})
        }else{
			this.setState({GIFEnable: true})
		}

		Axios.get(url).then(({data:{data:{ after, children, dist }}}) => this.setState({posts: children, after, count: dist, isLoading: false}))
	}

	setFilter = () => {
        let { NSFWEnable } = this.state
        this.setState({NSFWEnable: !NSFWEnable})
        localStorage.setItem('GIFEnable', !NSFWEnable)
	}
	
	setGif = () => {
        let { GIFEnable } = this.state
        this.setState({GIFEnable: !GIFEnable})
		localStorage.setItem('GIFEnable', !GIFEnable)
		window.location.reload()
	}
	
    refetch = () => {
		let { r, limit } = getQueryString()
		let subreddit = r ? r.includes('user/') ? `${r}`: `r/${r}` : "r/all"
		let { after, count, posts } = this.state
		let url = `https://www.reddit.com/${subreddit}.json?raw_json=1&limit=${isMobile ? limit ? limit : '50' : limit ? limit : '100'}&count=${count}&after=${after}`

		Axios.get(url).then(({data:{data:{ after, children, dist }}}) => {
			let filter = children.filter(({data: { id }}) => {
				let arr = posts.map(({data: { id }}) => id)
				return !arr.includes(id)
			})

			this.setState({posts: [...this.state.posts, ...filter], after, count: this.state.count + dist, isRefetching: false })
		})
    }
}

export default App;