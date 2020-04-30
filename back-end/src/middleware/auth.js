import jwt from 'jsonwebtoken'
import {createAccount,findAccountById} from '../tables/account-table'
import {jwtConfig} from '../config/database-config'
import bcrypt from 'bcryptjs'


// TODO deal with multiple logins later.. don't want a billion
// tokens?

// middleware make sure the user is authenticated for
// the pages
const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,jwtConfig)
        // see if the account exists
        // const account = await ({_id:decoded._id, 'tokens.token':token})
        const account = await findAccountById(parseInt(decoded._id,10))
        if(!account){
            throw new Error()
        }
        req.account = account
        req.id = account.id
        req.token = token
        next()
    }catch(error){
        res.status(401).send({error:'Please authenticate'})
    }
}

const tokenForAccount = async (account)=>{
    // jwt.sign({payload?}.toString, private key for jwt algorithm?,
    // {algorithm} => defaults to hs256)

    // create a new token for given account
    const token = await jwt.sign({_id:account.id.toString()},jwtConfig,{expiresIn:'2d'})
    return token
}


export {auth, tokenForAccount}