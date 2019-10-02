import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import WordReducer from './reducers/WordReducer';
import AttemptsReducer from './reducers/AttemptsReducer';

//font
import './font/AllerDisplay.ttf';


const rootReducer = combineReducers(
  {
    word: WordReducer,
    attempts:AttemptsReducer
    });

const hangmanStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={hangmanStore} > <App/> </Provider> , document.getElementById('root'));

serviceWorker.unregister();
