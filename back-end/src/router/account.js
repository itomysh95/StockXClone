import express from 'express'
import {
    createAccount, 
    updateAccount, 
    getAccount, 
    deleteAccount, 
    signinAccount, 
    verifyAccount, 
    findAccountById
} from '../tables/account-table'
import {tokenForAccount, auth} from '../middleware/auth'
const router = new express.Router()
router.use(express.json())



// create a new account
router.post('/account',async (req,res)=>{
    try{
        const account = await createAccount(req.body)
        if(account.error){
            throw account.error
        }
        res.status(201).send(account)
        
    }catch(error){
        res.status(400).send(error)
    }
})

// update info on this account
router.patch('/account/settings/update',auth ,async (req,res)=>{
    try{
        const account = await updateAccount(req.account.accountName,req.body)
        if(account.error){
            throw account.error
        }
        res.status(200).send(account)
    }catch(error){
        res.status(400).send(error)
    }
})

// get info on this account
router.get('/account/settings/:accountName', auth, async (req,res)=>{
    try{
        res.status(200).send(req.account)
    }catch(error){
        res.status(404).send(error)
    }
})

// // testing table
// router.get('/account/protected',auth,async(req,res)=>{
//     try{
//         res.status(200).send({account:req.account,token:req.token})
//     }catch(error){
//         res.status(400).send('error')
//     }
// })



// delete this account
router.delete('/account/settings/delete',auth,async (req,res)=>{
    try{
        const account = await deleteAccount(req.account.accountName)
        if(account.error){
            throw account.error
        }
        res.status(200).send(account)
    }catch(error){
        res.status(400).send(error)
    }
})


// TODO 
// login the account
router.post('/account/login', async (req,res)=>{
    try{
        const account = await signinAccount(req.body.email,req.body.password)
        if(account.error){
            throw account.error
        }
        const token = await tokenForAccount(account)
        res.status(200).send({account,jwtToken:token})
    }catch(error){
        res.status(400).send(error)
    }
})

// // log out the account
// router.get('/account/logout',async (req,res)=>{
//     try{

//     }catch(error){
//         res.status(400).send(error)
//     }
// })
export {router as accountRouter}