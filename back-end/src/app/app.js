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
import {brandRouter} from '../router/brand'
import {sneakerRouter} from '../router/sneaker'
import {accountRouter} from '../router/account'


const app = express()
const port = process.env.PORT || 3000


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Accesss-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
})

app.use(brandRouter)
app.use(sneakerRouter)
app.use(accountRouter)
app.use(express.json())

app.listen(port,()=>{
    console.log('Server is up!')
})

export default app