import {Pool}from 'pg'
import {poolInfo}from '../config/database-config'


const pool = new Pool(poolInfo);

// const query = async (text,params)=> await pool.query(text,params)

export {pool}