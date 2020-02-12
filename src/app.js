import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();


// provider connects to store? connect connects to provider?
const jsx=(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('app'));
