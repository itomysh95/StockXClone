const {Pool} = require('pg')
const {poolInfo} =require('../database-info/database-config')


const pool = new Pool(poolInfo);

// const query = async (text,params)=> await pool.query(text,params)

module.exports=pool