// import { createBrand } from '../tables/brand-table'
import {createSneaker, getSneakers} from '../tables/sneaker-table'
import {pool} from './database-pool'
import {dropTable} from './database-queries'
import { newEntry } from '../tables/inventory-table'
import { createAccount, findAccountById } from '../tables/account-table'
import { createCustomer } from '../tables/customer-table'

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
    'inventory',
]

// drop sneaker/account/inventory tables and recreate them
const tableSetup = async ()=>{
    try{
        await dropTable(tables);
    }catch(error){
        // return console.log(error)
        return console.log('error: ',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS sneaker(
            id              SERIAL PRIMARY KEY,
            "sneakerName"   VARCHAR(64) UNIQUE NOT NULL,
            "amountSold"    INTEGER NOT NULL,
            "sneakerInfo"   TEXT,
            "brandName"     VARCHAR(64) NOT NULL,
            "retailPrice"   MONEY,
            "male"          BOOLEAN NOT NULL
            );`
        ) 
        console.log(`sneaker table created succesfuly`)
    } catch(error){
        return console.log('error :',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS account(
            id                  SERIAL PRIMARY KEY,
            "accountName"       VARCHAR(64) UNIQUE NOT NULL,
            "password"          VARCHAR(64) NOT NULL,
            "email"             VARCHAR(255) UNIQUE NOT NULL,
            "sneakersSold"      INTEGER,
            "sneakersBought"    INTEGER
            );`
        )
        console.log(`account table created succesfuly`)
    }catch(error){
        return console.log('error :',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS inventory(
                id                  SERIAL PRIMARY KEY,
                "sneakerName"       VARCHAR(64) NOT NULL,
                "bid"               BOOLEAN NOT NULL,
                "price"             MONEY NOT NULL,
                "size"              NUMERIC(3,1) NOT NULL,
                "male"              BOOLEAN NOT NULL,
                "customerId"        SERIAL NOT NULL REFERENCES customer("id") ON DELETE CASCADE,
                "completed"         BOOLEAN NOT NULL DEFAULT FALSE,
                FOREIGN KEY     ("sneakerName") REFERENCES sneaker("sneakerName") ON DELETE CASCADE    
            );`
        )
        console.log(`inventory table created succesfuly`)
    }catch(error){
        return console.log('error:', error)
    }
}

// To load some sneaker data to database
const loadSneakers= async ()=>{
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
        console.log('sneaker data loaded successfully')
    }catch(error){
        console.log(error)
    }
}

// create testing accounts in database
const loadAccounts = async()=>{
    try{
        let accountDetails
        let sneakersSold=0;
        let sneakersBought=0;
        let i;
        for(i=0;i<10;i++){
            if(faker.random.number(10)%2===0){
                sneakersSold = faker.random.number(20)
            }
            if(faker.random.number(10)%2===0){
                sneakersBought = faker.random.number(20)
            }
            accountDetails = {
                accountName:faker.name.findName(),
                password:'password123',
                email:faker.internet.email(),
                sneakersSold,
                sneakersBought

            }
            await createAccount(accountDetails)
        }
        console.log('account data loaded successfully')
    }catch(error){
        console.log(error)
    }
}



// to load some bid entries into inventory table, if bid=false => ask entries
const loadInventory = async(bid=true)=>{
    try{
        const getTestCustomers = await pool.query(
            `
                SELECT id FROM customer;
            `
        )
        const testCustomers = getTestCustomers.rows
        const len = testCustomers.length-1
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
                        male:sneaker.male,
                        customerId:testCustomers[faker.random.number(len)].id
                    }
                    await newEntry(entryDetails)
                }
            })
        }
        console.log('inventory data loaded successfully')
    }catch(error){
        console.log(error)
    }
}

const ordersTables = [
    'orders',
    'customer',
    'paymentInfo',
    'ordersArchive'
]

// drop and create orders table, shipping info and payment info and transaction history records
const ordersTableSetup = async()=>{
    try{
        await dropTable(ordersTables)
    }catch(error){
        return console.log('error dropping tables:',error)
    }
    // customer info table
    try{
        await pool.query(   
            `CREATE TABLE IF NOT EXISTS customer(
            id                  SERIAL PRIMARY KEY,
            "fullName"          VARCHAR(64) NOT NULL,
            "phoneNumber"       VARCHAR(32) NOT NULL,
            "addressOne"        VARCHAR(128) NOT NULL,
            "addressTwo"        VARCHAR(128),
            "city"              VARCHAR(64) NOT NULL,
            "country"           VARCHAR(64) NOT NULL,
            "zipCode"           VARCHAR(64) NOT NULL,
            "province"          VARCHAR(64) NOT NULL,
            "accountId"         SERIAL NOT NULL,
            FOREIGN KEY ("accountId") REFERENCES account("id") ON DELETE CASCADE
            );`
        )
        console.log(`customer table created succesfuly`)
    }catch(error){
        return console.log(`error creating customer:`,error)
    }
    // orders info
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS orders(
                id                     SERIAL PRIMARY KEY,
                "inventoryId"          SERIAL NOT NULL,
                "buyerId"              SERIAL NOT NULL REFERENCES customer("id") ON DELETE CASCADE,
                "sellerId"             SERIAL NOT NULL REFERENCES account("id") ON DELETE CASCADE,
                "date"                 VARCHAR(64) NOT NULL,
                FOREIGN KEY ("inventoryId") REFERENCES inventory("id") ON DELETE CASCADE
            );`
        )
        console.log(`orders table created succesfuly`)
    }catch(error){
        return console.log(`error creating orders:`,error)
    }
    // -----------------------------------------------
    // TODO
    // payment info table
    // try{
    //     `CREATE TABLE IF NOT EXISTS paymentInfo(
    //     id                      SERIAL PRIMARY KEY,
    //     "orderId"               SERIAL NOT NULL,
    //     "fullName"              VARCHAR(64) NOT NULL,
    //     "cardNumber"            INTEGER NOT NULL,
    //     "expiry"                INTEGER NOT NULL,
    //     "cvv"                   INTEGER NOT NULL,
    //     "totalCost"             INTEGER NOT NULL,
    //     FOREIGN KEY ("orderId") REFERENCES orders("id") ON DELETE CASCADE
    //     );`
    //     console.log(`paymentInfo table created succesfuly`)
    // }catch(error){
    //     return console.log(`error creating paymentInfo:`,error)
    // }
    // -----------------------------------------------
    try{
        // TODO orders archive
        await pool.query(
            `CREATE TABLE IF NOT EXISTS ordersArchive(
            id                  SERIAL PRIMARY KEY,
            "orderId"           SERIAL NOT NULL,
            FOREIGN KEY ("orderId") REFERENCES orders("id") ON DELETE CASCADE
            ) `
        )
        console.log(`ordersArchive table created succesfuly`)
    }catch(error){
        return console.log(`error creating ordersArchive:`,error)
    }
}

// load some customers into customer table
const loadCustomers = async()=>{
    try{
        // get all the account ids 
        const getTestAccountIds = await pool.query(
            `
            SELECT id FROM account
            `
        )
        let accounts = getTestAccountIds.rows
        let addressTwo
        await Promise.all(accounts.map(async(id)=>{
            // random option of populating address two
            if(faker.random.number(10)%2===0){
                addressTwo=faker.address.streetAddress()
            }
            // create the customer
            await createCustomer({
                fullName: faker.name.findName(),
                phoneNumber:faker.phone.phoneNumber(),
                addressOne:faker.address.streetAddress(),
                addressTwo,
                city:faker.address.city(),
                country:faker.address.country(),
                zipCode:faker.address.zipCode(),
                province:faker.address.state(),
                accountId:id.id
            })
        }))
        console.log('customer data loaded successfuly')
    }catch(error){
        console.log(error)
    }
}

const loadOrders = async()=>{
    try{

    }catch(error){
        console.log(error)
    }
}

const start = async()=>{
    await tableSetup()
    await loadSneakers()
    await loadAccounts()
    await ordersTableSetup()
    await loadCustomers()
    await loadInventory()
    await loadOrders()
}

start()