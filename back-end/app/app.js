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



const express = require('express')
const brandRouter = require('../router/brand')
const sneakerRouter = require('../router/sneaker')

const app = express()
const port = process.env.PORT || 3000

app.use(brandRouter)
app.use(sneakerRouter)
app.use(express.json())


app.listen(port,()=>{
    console.log('Server is up!')
})

module.exports=app