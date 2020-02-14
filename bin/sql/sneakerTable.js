const pool = require('../../src/dataBaseStuff/databasePool')

// CREATE TABLE sneaker(
//     id              SERIAL PRIMARY KEY,
//     "sneakerName"   VARCHAR(64) NOT NULL,
//     quantity        INTEGER NOT NULL,
//     "amountSold"    INTEGER NOT NULL,
//     "sneakerinfo"   TEXT,
//     "brandId"       INTEGER, 
//     FOREIGN KEY     ("brandId") REFERENCES brand(id)   
// );


// get info on a sneaker
const getSneaker = async (sneaker,filter={})=>{
}

// add a quantity of sneakers
const addSneaker = async (sneaker, quantity=1)=>{

}

// remove a quantity of sneakers
const removeSneaker = (sneaker, quantity=1)=>{

}

// create a new sneaker in the database
const createSneaker = async (sneaker)=>{
    try{
        await pool.query(
            'INSERT INTO sneaker("sneakerName","quantity","amountSold","sneakerInfo","brandId") VALUES($1,$2,$3,$4,$5)',
            // can't use spread operator here?
            // [...sneaker]
            [
                sneaker.sneakerName,
                sneaker.quantity,
                sneaker.amountSold,
                sneaker.sneakerInfo,
                sneaker.brandId
            ]
        )
    }catch(error){
        console.log('error: ',error)
    }
}

module.exports={
    getSneaker,
    addSneaker,
    removeSneaker,
    createSneaker
}


