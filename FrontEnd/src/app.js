// import Express from 'express'
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
// const express = require('express');
// const app = express();
// const port = 3000;
// app.get('/',(req,res)=> res.send('hello world'))
// app.listen(port,()=> console.log(`example app listneing on port ${port}!`))


const store = configureStore();

// const port = 8080
// const app = express()

// provider connects to store? connect connects to provider?
const jsx=(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('app'));


// app.get('/dragon/new', (req,res)=>{
//     res.json({sneaker: 'airjordan1'})
// });

// app.listen(port,()=>{
//     console.log(`listening on port ${port}`)
// })

// module.exports =app;