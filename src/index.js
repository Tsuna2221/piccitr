import React from 'react';
import ReactDOM from 'react-dom';
import './modular.css';
import './bundle.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register()