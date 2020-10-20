import express from 'express'
const router = new express.Router()
router.use(express.json())
import {
    getAccountRates
} from '../tables/account-type-table'

router.get('/accountType/:type',async(req,res)=>{
    try{
        const accountRates = await getAccountRates(req.params.type)
        res.status(200).send(accountRates)
    }catch(error){
        res.status(404).send(error)
    }
})

export {router as accountTypesRouter}