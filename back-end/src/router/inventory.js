import express from 'express'
const router = new express.Router()
router.use(express.json())
import {
    getQuantity,
    getBid,
    getAsk,
    newEntry,
    getDetails
} from '../tables/inventory-table'
// router file to handle inventory API calls

router.get('/inventory/details/:sneakerName',async(req,res)=>{
    try{
        const details = await getDetails(req.params.sneakerName)
        if(details.error){
            throw {error:details.error}
        }
        res.status(200).send(details)
    }catch(error){
        res.status(400).send(error)
    }
})

// posting a new entry
router.post('/inventory/createEntry', async(req,res)=>{
    try{
        const entry = await newEntry(req.body)
        if(entry.error){
            throw entry.error
        }
        res.status(200).send(entry)
    }catch(error){
        res.status(400).send(error)
    }
})

// getting ask prices for a sneaker
router.get('/inventory/ask',async(req,res)=>{
    try{
        
    }catch(error){
        res.status(404).send(error)
    }
})

// getting bid prices for a sneaker
router.get('/inventory/bid/:sneakerName/:quantity',async(req,res)=>{
    try{
        res.status(200).send({working:'working'})
    }catch(error){
        res.status(404).send(error)
    }
})

// get quantity of a sneaker in stock
// bid => true => bids
// bid => false => asks
router.get('/inventory/quantity/:sneakerName/:type',async(req,res)=>{
    try{
        const count = await getQuantity(req.params.sneakerName,req.params.type)
        if(count.error){
            throw count.error
        }
        res.status(200).send(count)
    }catch(error){
        res.status(404).send(error)
    }
})

router.get('/inventory/test/:sneakerName',async(req,res)=>{
    try{
        let details = await getDetails(req.params.sneakerName)
        console.log(details)
        res.status(200).send(details)
    }catch(error){
        res.status(400).send(error)
    }
})

export {router as inventoryRouter}