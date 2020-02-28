import {pool} from '../database-stuff/database-pool'
// some useful functions for SQL queries 


// given an array of tables drop them and cascade any foreign dependencies
const dropTable=async(tables)=>{
    if(!tables){
        throw {error:'No tables given'}
    }
    try{
        tables = tables.toString()
        await pool.query(
            `DROP TABLE IF EXISTS ${tables} CASCADE;`   
        )
        return{msg:`${tables} were dropped`}
    }catch(error){
        return {error}
    }
}


// given an array of values, return a string
// '$1,$2,$3...$n' for the psql VALUES parameter
const buildValues = (parameters)=>{
    try{
        if(parameters.length>0){    
            let i;
            let valueQuery = '$1'
            // for each item we want to put into values
            for(i=1;i<parameters.length;i++){
                valueQuery=valueQuery + `,$${i+1}`
            }
            return valueQuery
        }
    }catch(error){
        return {error}
    }
}

// given an object of key value pairs to update, return a string
// '"column"='value',"columnB"='valueb'..."columnN"='valueN''
// *** string values will be wrapped in quotes, column names will be wrapped
// in quotes ***
const updateQueryBuilder = (update)=>{
    try{
        // get the columns to be updated
        let columns = [...Object.keys(update)]
        let i;
        // get the new values
        let values = [...Object.values(update)]
        // wrap strings in quotes for SQL query
        values = values.map(value=>{
            if(typeof value === 'string'){
                return `\'${value}\'`
            }
            return value
        })
        // incase there is only 1 update
        let queryString=`"${columns[0]}" = `+values[0];
        // if more than one update, build the query
        if(columns.length>1){
            for(i=1;i<columns.length;i++){
                queryString+=','+`"${columns[i]}"`+"="+values[i]
            }
        }
        return queryString
    }
    catch(error){
        return error
    }
}



export {dropTable, 
    buildValues, 
    updateQueryBuilder}