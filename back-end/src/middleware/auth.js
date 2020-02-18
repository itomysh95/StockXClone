import jwt from 'jsonwebtoken'
import {createAccount} from '../tables/account-table'
import {jwtConfig} from '../database-info/database-config'
import bcrypt from 'bcryptjs'

const auth = async (req,res,next)=>{
    try{

    }catch(error){
        res.status(401).send({error:'Please authenticate'})
    }
}

const signIn = async(req,res,next)=>{

}

export {auth, signIn}