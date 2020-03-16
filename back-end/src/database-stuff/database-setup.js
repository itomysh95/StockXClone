// import { createBrand } from '../tables/brand-table'
import {createSneaker, getSneakers} from '../tables/sneaker-table'
import {pool} from './database-pool'
import {dropTable} from './database-queries'
import { map } from 'mssql'
import { newEntry } from '../tables/inventory-table'

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
            "brandName"     VARCHAR(64) NOT NULL,
            "retailPrice"   MONEY,
            "male"          BOOLEAN NOT NULL
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
                "bid"               BOOLEAN NOT NULL,
                "price"             MONEY NOT NULL,
                "size"              NUMERIC(3,1) NOT NULL,
                "male"              BOOLEAN NOT NULL,
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
    try{
        let i;
        for(i=0;i<30;i++){
            let num = faker.random.number(brands.length)
            let brandName = brands[num]
            let color = faker.commerce.color()
            let shoeNum = faker.random.number(12)
            let word = faker.random.word()
            let retailPrice = faker.random.number(175)
            let male = (faker.random.number(10)%2===0)
    
            let sneakerName = color+" "+brandName+" "+shoeNum+" "+word
            let amountSold = faker.random.number(20)
            let sneakerInfo = faker.lorem.sentence(9)
            const sneaker = {
                sneakerName,
                amountSold,
                sneakerInfo,
                brandName,
                retailPrice,
                male
            }
            await createSneaker(sneaker)
        }

    }catch(error){
        console.log(error)
    }
}

const loadTestUsers = async()=>{

}

// to load some bid entries, if bid=false => ask entries
const loadBids = async(bid=true)=>{
    try{
        let i;
        let j;
        let brand;
        let entryDetails;
        // smallest and largest of male shoe sizes subtracted by 0.5(for random size, will add 0.5 later)
        let smallest = 3;
        let largest = 17.5;
        let midSize;
        let numOfBids;
        // for each of the brands
        for(i=0;i<brands.length;i++){
            // get all the sneakers of the brand
            brand = await getSneakers(brands[i])
            // for each sneaker of the brand
            brand.data.map(async (sneaker)=>{
                // random number of bids to create for each sneaker
                numOfBids = faker.random.number(10)
                // for each bid
                for(j=0;j<numOfBids;j++){
                    // if female shoe change to female shoe sizes
                    if(!sneaker.male){
                        smallest = 4.5;
                        largest = 17;
                    }
                    // randomly add 0.5 
                    midSize = (faker.random.number(1)/0.5)
                    // entry details to create a new entry
                    entryDetails = {
                        sneakerName:sneaker.sneakerName,
                        bid,
                        price:(faker.random.number(500)+100),
                        size:(faker.random.number(largest-smallest)+smallest+midSize),
                        male:sneaker.male
                    }
                    await newEntry(entryDetails)
                }
            })
        }
    }catch(error){
        console.log(error)
    }
}


const start = async()=>{
    // await tableSetup()
    // await loadTestSneakers()
    // await loadTestUsers()
    // await loadBids()
    // await loadBids()
    // // close the connection?
    await pool.end()
}

start()