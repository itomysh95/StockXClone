import React from 'react'
import { Link } from 'react-router-dom'

const OrderSubmitted=()=>{
    return(
            <div className='container' align='center'>
                <h1>Your order has been submited and is being processed!</h1>
                <img src={`/images/Submited.png`} />
                <Link to={'/'}> Click here to return to the homepage </Link>
            </div>
        )
}


export default OrderSubmitted