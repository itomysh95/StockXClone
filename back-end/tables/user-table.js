const pool = require('../database-stuff/database-pool')

// CREATE TABLE user(
//  id                  SERIAL PRIMARY KEY,
//  "username"          VARCHAR(64) UNIQUE NOT NULL,
//  "password"          VARCHAR(64) NOT NULL,
//  "sneakersSold"      INT,
//  "sneakersBought"    INT,
// )



// create a new user in database
const createUser = async(userDetails)=>{
    try{
        user = pool.query(
            ""
        )

        if(user.error){
            throw
        }

        return user
    }catch(error){
        return error
    }
}

// update info on a user in database 
const updateUser = async()=>{

}


// get info on a user in database
const getUser = async()=>{

}

// delete a user in database
const deleteUser = async()=>{

}


export {createUser,updateUser,getUser,deleteUser}