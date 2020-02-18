import express from 'express'
import {createSneaker, getSneaker,getSneakers, updateSneakerInfo, deleteSneaker} from '../tables/sneaker-table'
const router = new express.Router()
router.use(express.json())
// Router file to handle sneaker API calls

    
// create a new sneaker and add to database
router.post('/sneaker', async (req,res)=>{
    try{
        const result = await createSneaker({
            ...req.body
        })

        if(result.error){
            throw {error:result.error.detail}
        }

        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// get all the sneakers of a brand
router.get('/sneakers/:brand', async (req,res)=>{
    try{
        const result = await getSneakers(req.params.brand)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// get a sneaker by name
router.get('/sneaker/:name', async (req,res)=>{
    try{
        const result = await getSneaker(req.params.name)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// given key value pairs, update the sneaker's info
router.patch('/sneaker/:name', async (req,res)=>{
    try{
        const result = await updateSneakerInfo(req.params.name.toLowerCase(),req.body)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})


// delete a sneaker from the database
router.delete('/sneaker/:name', async(req,res)=>{
    try{
        const result = await deleteSneaker(req.params.name)
        if(result.error){
            throw {error:result.error.detail}
        }
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }

})

export{router as sneakerRouter}