import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux';
import {AppContainer} from 'react-hot-loader'
import './index.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

const mountNode = document.getElementById('app');

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();



// import React from 'react';

// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
