import express from 'express'
const router = new express.Router()
router.use(express.json())
import {
    getQuantity,
    getPrices,
    getPricesAll,
    newEntry,
    getDetails,
    getSizePrice,
    getStats
} from '../tables/inventory-table'
// router file to handle inventory API calls


// get lowest ask, highest bid, quantity of a sneaker
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

// creating a new bid or ask entry
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
// TODO
// get a list of all the lowest ask prices for a given sneaker, quanitty specified
// 'NOT' specifies it's an ask and not a bid request
router.get('/inventory/price/ask/sneaker/:sneakerName/:quantity',async (req,res)=>{
    try{
        let list = await getPrices(req.params.sneakerName,req.params.quantity,'NOT')
        res.status(200).send(list)
    }catch(error){
        res.status(404).send(error)
    }
})


// get a list of all the lowest ask prices of all sneakers given a quantity
router.get('/inventory/price/ask/all/:quantity',async(req,res)=>{
    try{
        let list = await getPricesAll(req.params.quantity)
        res.status(200).send(list)
    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

// get a list of all the highest bid prices of all sneakers given a quantity
router.get('/inventory/price/bid/all/:quantity',async(req,res)=>{
    try{
        let list = await getPricesAll(req.params.quantity,'NOT')
        res.status(200).send(list)
    }catch(error){
        res.status(404).send(error)
    }
})


// get quantity of a sneaker in stock type=> bid or ask
// bid => true => bids
// bid => false => asks
// router.get('/inventory/quantity/:sneakerName/:type',async(req,res)=>{
//     try{
//         const count = await getQuantity(req.params.sneakerName,req.params.type)
//         if(count.error){
//             throw count.error
//         }
//         res.status(200).send({quantity:count}) 
//     }catch(error){
//         res.status(404).send(error)
//     }
// })

router.get('/inventory/test/:sneakerName',async(req,res)=>{
    try{
        let details = await getDetails(req.params.sneakerName)
        res.status(200).send(details)
    }catch(error){
        res.status(400).send(error)
    }
})

// get the lowest ask prices of each size of a given sneaker
router.get('/inventory/retrieve/ask/size/:sneakerName',async(req,res)=>{
    try{
        let prices = await getSizePrice(req.params.sneakerName,'NOT')
        res.status(200).send(prices)
    }catch(error){
        res.status(400).send(error)
    }
})

// get the highest bid prices of each size of a given sneaker
router.get('/inventory/retrieve/bid/size/:sneakerName',async(req,res)=>{
    try{
        let prices = await getSizePrice(req.params.sneakerName)
        res.status(200).send(prices)
    }catch(error){
        res.status(400).send(error)
    }
})

// get sneaker statistics
router.get('/inventory/retrieve/stats/:sneakerName', async (req,res)=>{
    try{
        const stats = await getStats(req.params.sneakerName)
        res.status(200).send(stats)
    }catch(error){
        res.status(400).send(error)
    }
})


export {router as inventoryRouter}