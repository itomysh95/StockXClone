import express from 'express'
const router = new express.Router()
router.use(express.json())
import {
    createOrder
} from '../tables/orders-table'

import {auth} from '../middleware/auth'



router.post('/orders/submit/createOrder', auth ,async(req,res)=>{
    try{
        const success = await createOrder(req.body,req.account)
        if(success.error){
            throw success.error
        }
        res.status(200).send(success)
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/orders/submit/createOrder/guest', async(req,res)=>{
    try{
        const success = await createOrder(req.body)
        res.status(200).send(success)
    }catch(error){
        res.status(400).send(error)
    }
})


export {router as ordersRouter}