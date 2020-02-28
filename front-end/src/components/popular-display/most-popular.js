import React, { useState, useEffect, Component} from 'react'
import {connect} from 'react-redux'

// CREATE TABLE sneaker(
//     id              SERIAL PRIMARY KEY,
//     "sneakerName"   VARCHAR(64) NOT NULL,
//     quantity        INTEGER NOT NULL,
//     "amountSold"    INTEGER NOT NULL,
//     "sneakerinfo"   TEXT,
//     "brandName"     INTEGER, 
//     FOREIGN KEY     ("brandName") REFERENCES brand("brandName")   
// );

// functional component approach
const MostPopular = () => {
    const [sneakerData, setData] = useState([])
    useEffect(()=>{
        async function fetchSneaker(){
            try{
                // read in the data
                const res = await fetch('http://localhost:3000/sneaker/retrieve/name/Green Turbo Jordan 15  ')
                const sneaker = await res.json()
                // set the state of sneakerData to the sneaker json object propeprties
                setData(sneaker.sneaker)
            }catch(error){
                console.log(error)
            }
        }
        fetchSneaker()
    },[])
    return(                    
        <div>
            <h3>Sneaker: {sneakerData.sneakerName}</h3>
            <h3>Brand: {sneakerData.brandName}</h3>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        
    }
}

export default connect(mapStateToProps)(MostPopular)