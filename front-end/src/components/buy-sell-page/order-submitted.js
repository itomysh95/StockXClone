import React from 'react'
import { Link } from 'react-router-dom'

const OrderSubmitted=(props)=>{
    return(
        <div>
            <div className='container' align='center'>
                <h1>Your order has been submited and is being processed!</h1>
                <img src={`/images/Submited.png`} />
            </div>
            <div className='container' align='center'>
                <Link to={'/'}> Click here to return to the homepage and continue shopping!</Link>
            </div>
        </div>  
        )
}


export default OrderSubmitted