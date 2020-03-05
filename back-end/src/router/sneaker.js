import express from 'express'
import {createSneaker, 
    getSneaker,
    updateSneakerInfo, 
    deleteSneaker,
    getPopular} from '../tables/sneaker-table'
const router = new express.Router()
router.use(express.json())
// Router file to handle sneaker API calls

    
// create a new sneaker and add to database
router.post('/sneaker/create', async (req,res)=>{
    try{
        const result = await createSneaker({
            ...req.body
        })
        if(result.error){
            throw result.error
        }

        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})


// get a sneaker by name
router.get('/sneaker/retrieve/name/:name', async (req,res)=>{
    try{
        const result = await getSneaker(req.params.name)
        if(result.error){
            throw result.error
        }

        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// given key value pairs, update the sneaker's info
router.patch('/sneaker/update/name/:name', async (req,res)=>{
    try{
        const result = await updateSneakerInfo(req.params.name.toLowerCase(),req.body)
        if(result.error){
            throw result.error
        }

        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})


// delete a sneaker from the database
router.delete('/sneaker/delete/name/:name', async(req,res)=>{
    try{
        const result = await deleteSneaker(req.params.name)
        if(result.error){
            throw result.error
        }
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }

})

// get the most popular sneakers
router.get('/sneaker/retrieve/popular/:amount',async(req,res)=>{
    try{
        const sneakerList = await getPopular(req.params.amount)
        if(sneakerList.error){
            throw sneakerList.error
        }
        res.status(200).send(sneakerList)
    }catch(error){
        res.status(400).send(error)
    }
})

export{router as sneakerRouter}