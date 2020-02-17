const express = require('express')
const router = new express.Router()
const {} = require('../tables/user-table')
import {createUser, updateUser, getUser, deleteUser} from '../tables/user-table'
router.use(express.json())

// TODO:
// add authentication



// create a new user
router.post('/user',async (req,res)=>{
    try{
        user = await createUser(req.body)

        if (user.error){
            throw {error:user.error}
        }

        res.status(201).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})

// update info on this user
router.patch('/user/:id',async (req,res)=>{
    try{
        user = await updateUser(req.body)

        if(user.error){
            throw {error:user.error}
        }
    }
    catch(error){
        return error
    }
})

// get info on this user
router.get('/user/:id',async (req,res)=>{

})

// delete this user
router.delete('/user/:id',async (req,res)=>{

})