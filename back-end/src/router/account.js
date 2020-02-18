import express from 'express'
import {createAccount, updateAccount, getAccount, deleteAccount} from '../tables/account-table'
const router = new express.Router()
router.use(express.json())

// TODO:
// add middleware authentication



// create a new account
router.post('/account',async (req,res)=>{
    try{
        const account = await createAccount(req.body)
        res.status(201).send(account)
    }catch(error){
        res.status(400).send(error)
    }
})

// update info on this account
router.patch('/account/:accountName',async (req,res)=>{
    try{
        const account = await updateAccount(req.params.accountName,req.body)
        res.status(200).send(account)
    }catch(error){
        res.status(400).send(error)
    }
})

// get info on this account
router.get('/account/:accountName',async (req,res)=>{
    try{
        const account = await getAccount(req.params.accountName)
        res.status(200).send(account)
    }catch(error){
        res.status(404).send(error)
    }
})

// delete this account
router.delete('/account/:accountName',async (req,res)=>{
    try{
        const account = await deleteAccount(req.params.accountName)
        res.status(200).send(account)
    }catch(error){
        res.status(400).send(error)
    }
})



// // TODO
// // login the account
// router.get('/account/login',async (req,res)=>{
//     try{
        
//     }catch(error){
//         res.status(400).send(error)
//     }
// })

// // log out the account
// router.get('/account/logout',async (req,res)=>{
//     try{

//     }catch(error){
//         res.status(400).send(error)
//     }
// })
export {router as accountRouter}