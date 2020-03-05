// import { createBrand } from '../tables/brand-table'
import {createSneaker} from '../tables/sneaker-table'
import {pool} from './database-pool'
import {dropTable} from './database-queries'

var faker = require('faker')

faker.seed(123)
const brands = [
    'Addidas',
    'Nike',
    'Jordan',
    'Puma',
    'NewBalance'
]
// table names
const tables=[
    'sneaker',
    'account',
    'inventory'
]

// drop current table and recreate the brand and sneaker tables
const tableSetup = async ()=>{
    try{
        await dropTable(tables);
    }catch(error){
        // return console.log(error)
        return console.log('error: ',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ${tables[0]}(
            id              SERIAL PRIMARY KEY,
            "sneakerName"   VARCHAR(64) UNIQUE NOT NULL,
            "amountSold"    INTEGER NOT NULL,
            "sneakerInfo"   TEXT,
            "brandName"     VARCHAR(64) NOT NULL
            );`
        ) 
        console.log(`${tables[0]} table created succesfuly`)
    } catch(error){
        return console.log('error :',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ${tables[1]}(
            id                  SERIAL PRIMARY KEY,
            "accountName"       VARCHAR(64) UNIQUE NOT NULL,
            "password"          VARCHAR(64) NOT NULL,
            "email"             VARCHAR(255) UNIQUE NOT NULL,
            "sneakersSold"      INTEGER,
            "sneakersBought"    INTEGER
            );`
        )
        console.log(`${tables[1]} table created succesfuly`)
    }catch(error){
        return console.log('error :',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ${tables[2]}(
                id                  SERIAL PRIMARY KEY,
                "sneakerName"       VARCHAR(64) NOT NULL,
                "quantity"          INTEGER NOT NULL,
                "bid"               BOOLEAN NOT NULL,
                "price"             MONEY NOT NULL,
                FOREIGN KEY     ("sneakerName") REFERENCES ${tables[0]}("sneakerName") ON DELETE CASCADE    
            );`
        )
        console.log(`${tables[2]} table created succesfuly`)
    }catch(error){
        return console.log('error:', error)
    }
}



// To load some sneaker data to database
const loadTestSneakers= async ()=>{
    var i;
    for(i=0;i<30;i++){
        let num = faker.random.number(brands.length)
        let brandName = brands[num]
        let color = faker.commerce.color()
        let shoeNum = faker.random.number(12)
        let word = faker.random.word()

        let sneakerName = color+" "+brandName+" "+shoeNum+" "+word
        let amountSold = faker.random.number(20)
        let sneakerInfo = faker.lorem.sentence(9)
        const sneaker = {
            sneakerName,
            amountSold,
            sneakerInfo,
            brandName
        }
        await createSneaker(sneaker)
    }
}



const start = async()=>{
    await tableSetup()
    await loadTestSneakers()
    // await loadTestUsers()
    // close the connection?
    await pool.end()
}

start()