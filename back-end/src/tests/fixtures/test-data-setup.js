import {pool} from'../../database-stuff/database-pool'
import {dropTable} from'../../database-stuff/database-queries'
import {createBrand}from'../../tables/brand-table'
import  {createSneaker} from'../../tables/sneaker-table'

// test tables
const testTables = [
    'brandTest',
    'sneakerTest'
]
// sample brands
const brands = [
    'Addidas',
    'Jordan',
]

// sample shoes
const shoes = [
    {
        "sneakerName":"Bred",
        "quantity":50,
        "amountSold": 0,
        "sneakerInfo": "Jordan 1 bred",
        "brandName": brands[1]
    },{
        "sneakerName":"Yeezy",
        "quantity":15,
        "amountSold": 3,
        "sneakerInfo": "Yeezy white",
        "brandName": brands[0]    
    },{
        "sneakerName":"Grand Court",
        "quantity":50,
        "amountSold": 0,
        "sneakerInfo": "Addidas Grand Court white",
        "brandName": brands[0]
    }
]


// create brand and sneaker tables in test data and populate with sample data above
const setupTestTable = async ()=>{
    // create brand test table
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ${testTables[0]}(
            id          SERIAL PRIMARY KEY,
            "brandName" VARCHAR(64) UNIQUE NOT NULL
            );`
        )
        console.log(`${testTables[0]} table created succesfuly`)
    } catch(error){
        return console.log('error',error)
    }
    // create sneaker test table
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ${testTables[1]}(
            id              SERIAL PRIMARY KEY,
            "sneakerName"   VARCHAR(64) UNIQUE NOT NULL,
            "quantity"      INTEGER NOT NULL,
            "amountSold"    INTEGER NOT NULL,
            "sneakerInfo"   TEXT,
            "brandName"     VARCHAR(64) NOT NULL, 
            FOREIGN KEY     ("brandName") REFERENCES ${testTables[0]}("brandName") ON DELETE CASCADE
            );`
        ) 
        console.log(`${testTables[1]} table created succesfuly`)
    } catch(error){
        return console.log('error',error)
    }
    // populate brandTestTable with test brands
    try{
        let i;
        for(i=0;i<brands.length;){
            await pool.query(
                `INSERT INTO ${testTables[0]}("brandName")
                VALUES($1)`,
                [brands[i]]
            )
            
        }
    }catch(error){
        return console.log('error',error)
    }
    // populate sneakerTestTable with sneakers
    try{
        let i;
        for(i=0;i<shoes.length;i++){
            await pool.query(
                `INSERT INTO ${testTables[1]}(
                    "sneakerName",
                    "quantity",
                    "amountSold",
                    "sneakerInfo",
                    "brandName")
                VALUES($1,$2,$3,$4,$5)`,
                [
                    brands[i].sneakerName,
                    brands[i].quantity,
                    brands[i].amountSold,
                    brands[i].sneakerInfo,
                    brands[i].brandName
                ]
            )
        }
    }catch(error){
        return console.log('error',error)
    }
}

// drop table in test data
const dropTestTable = async()=>{
    try{
        result = await dropTable(testTables)
        if (result.error){
            throw {error:result.error}
        }
        console.log(result)
    }catch(error){
        return {error}
    }
}

export {
    setupTestTable,
    brands,
    shoes,
    dropTestTable
}