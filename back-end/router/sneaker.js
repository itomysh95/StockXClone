const express = require('express')
const router = new express.Router()
const {createSneaker, getSneaker,getSneakers, updateSneakerInfo, deleteSneaker} = require('../tables/sneaker-table')
router.use(express.json())


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

        if(result.error){
            throw {error:result.error.detail}
        }
        
        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// get a sneaker by name
router.get('/sneaker/:name', async (req,res)=>{
    try{
        const result = await getSneaker(req.params.name)

        if(result.error){
            throw {error:result.error.detail}
        }

        res.status(200).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// given key value pairs, update the sneaker's info
router.patch('/sneaker/:name', async (req,res)=>{
    try{
        const result = await updateSneakerInfo(req.params.name.toLowerCase(),req.body)

        if(result.error){
            throw {error:result.error}
        }

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

module.exports = router