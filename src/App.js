import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Apollo Setup
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Styles
import './styles/App.css';

//Components
import SearchBar from './components/SearchBar'
import PostsGrid from './components/PostsGrid'

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
})

class App extends Component {
	render() {
		console.log("v0.189")
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div className="App">
						<a id="logo-anchor" target="_blank" rel="noopener noreferrer" href="https://www.github.com/tsuna2221/piccitr"><div id="page-logo"></div></a>
						<SearchBar/>
						<Route path="/" component={PostsGrid}></Route>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		);
	}

}

export default App;