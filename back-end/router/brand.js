const express = require('express')
const {createBrand,getBrand,removeBrand,updateBrand, getAllBrands} = require('../tables/brand-table')
const router = new express.Router()

router.use(express.json())


// get all the brand names
router.get('/brands', async(req,res)=>{
    try{
        const result = await getAllBrands()

        if(result.error){
            throw{error:result.error.detail}
        }

        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// get a brand by name
router.get('/brand/:name', async(req,res)=>{
    try{
        const name = req.params.name
        const result = await getBrand(name)

        if(result.error){
            throw {error:result.error.detail}
        }

        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// create and add a new brand to database
router.post('/brand',async(req,res)=>{
    const brand = req.body
    try{
        const result = await createBrand({
            ...brand
        })

        // if there was an error writing to database
        if (result.error){
            throw {error:result.error.detail}
        }

        // else return the object that was added
        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// delete a brand by name
router.delete('/brand/:name', async(req,res)=>{
    const name = req.params.name
    try{
        const result = await removeBrand(name)
        // if there was an error deleting from database
        if(result.error){
            throw {error:result.error.detail}
        }
        res.status(201).send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

// update a brand by name TODO at later time, not sure if needed right now
// router.delete('/brand', async(req,res)=>{
//     const brand = req.body;
//     try{
//         const result = await updateBrand({
//             ...brand
//         })

//         // if there was an error updating database
//         if(result.error){
//             throw{error:result.error.detail}
//         }
//     }catch(error){
//         res.status(400).send(error)
//     }
// })



module.exports=router