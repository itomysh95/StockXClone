const {Pool} = require('pg')
const {poolInfo} =require('../../databaseInfo/databaseConfig.js')


const pool = new Pool(poolInfo);
module.exports=pool



