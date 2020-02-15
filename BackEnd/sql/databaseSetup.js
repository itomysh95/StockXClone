const { createBrand }=require('../tables/brandTable')
const {createSneaker}=require('../tables/sneakerTable')
const pool = require('../dataBaseStuff/databasePool')

var faker = require('faker');
faker.seed(123)

// sample brand names
const brands = [
    'Addidas',
    'Nike',
    'Testoni',
    'Converse',
    'Berluti',
    'Reebok'
    ]

// drop current table and recreate the brand and sneaker tables
const tableSetup = async ()=>{
    try{
        await pool.query(
            'DROP TABLE IF EXISTS brand,sneaker CASCADE;'
        )
        console.log('tables dropped successfuly ')
    }catch(error){
        console.log('error',error)
    }
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS brand(
            id          SERIAL PRIMARY KEY,
            "brandName" VARCHAR(64) NOT NULL,
            CONSTRAINT name_unique UNIQUE ("brandName")
            );`
        )
        console.log('Brand table created succesfuly')
    } catch(error){
        return console.log('error',error)
    }
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS sneaker(
        id              SERIAL PRIMARY KEY,
        "sneakerName"   VARCHAR(64) NOT NULL,
        "quantity"      INTEGER NOT NULL,
        "amountSold"    INTEGER NOT NULL,
        "sneakerInfo"   TEXT,
        "brandId"       INTEGER, 
        FOREIGN KEY     ("brandId") REFERENCES brand(id) ON DELETE CASCADE   
        );`
        ) 
        console.log('sneaker table created succesfuly')
    } catch(error){
        return console.log('error',error)
    }
}


// To load some testing brand data to database 
const loadTestBrands = async ()=>{
    var i;
    for(i = 0;i<brands.length;i++){
        try{
            let brandName = brands[i]
            let brand = {name:brandName}
            await createBrand(brand)
        }catch(error){
            console.log(error)
        }
    }
}

// script to load some testing sneaker data to database
const loadTestSneakers= async ()=>{
    var i;
    for(i=0;i<30;i++){
        let num = faker.random.number(brands.length)
        let brandN = brands[num]
        let color = faker.commerce.color()
        let shoeNum = faker.random.number(12)

        let sneakerName = color+" "+brandN+" "+shoeNum
        let quantity = faker.random.number(100)
        let amountSold = faker.random.number(20)
        let sneakerInfo = faker.lorem.sentence(9)
        let brandId = faker.random.number(brands.length)
        sneaker = {
            sneakerName,
            quantity,
            amountSold,
            sneakerInfo,
            brandId
        }
        await createSneaker(sneaker)
    }
}


const start = async()=>{
    await tableSetup()
    await loadTestBrands()
    await loadTestSneakers()
}

start()