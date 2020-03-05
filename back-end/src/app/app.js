// const path = require('path')
// const express = require('express')
// const app = express()
// const publicPath = path.join(__dirname,'..','..','public')
// const port = process.env.PORT || 3000
// const router = express.Router()

// router.get('/',(req,res)=>res.send('Hello World!'));
// app.use('/',router);

// // app.use(express.static(publicPath));

// // app.get('*', (req,res)=>{
// //     res.sendFile(path.join(publicPath,'index.html'));
// // })



import express from 'express'
import cors from 'cors'
import {sneakerRouter} from '../router/sneaker'
import {accountRouter} from '../router/account'
import {inventoryRouter} from '../router/inventory'

const app = express()
const port = process.env.PORT || 3000


// makes sure that we take in input from localhost 8080
app.use(cors({origin:'http://localhost:8080'}))

app.use(sneakerRouter)
app.use(accountRouter)
app.use(inventoryRouter)
app.use(express.json())

app.listen(port,()=>{
    console.log('Server is up!')
})

export default app