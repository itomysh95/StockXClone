import express from 'express'
const router = new express.Router()
router.use(express.json())
import {
    createOrder
} from '../tables/orders-table'

import {auth} from '../middleware/auth'



router.post('/orders/submit/createOrder', auth ,async(req,res)=>{
    try{
        const orderId = await createOrder(req.body,req.account)
        if(orderId.error){
            throw orderId.error
        }
        res.status(200).send(orderId)
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/orders/submit/createOrder/guest', async(req,res)=>{
    try{
        const orderId = await createOrder(req.body)
        if(orderId.error){
            throw orderId.error
        }
        res.status(200).send(orderId)
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/orders/submit/create')

export {router as ordersRouter}