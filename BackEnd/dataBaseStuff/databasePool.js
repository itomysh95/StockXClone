const {Pool} = require('pg')
const {poolInfo} =require('../databaseInfo/databaseConfig')


const pool = new Pool(poolInfo);
module.exports=pool



