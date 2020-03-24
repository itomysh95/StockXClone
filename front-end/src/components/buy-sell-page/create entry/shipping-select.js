import React from 'react'

const ShippingSelect = (props)=>{
    console.log(props)
    return(
        <div className='container'>
            <h1>Shipping</h1>
            <h3 className='font-color-grey'>Please provide your shipping info</h3>

            <div className='container'>
                <h3>Shipping Info</h3>
                <form>
                    <input placeholder='First Name'></input>
                    <input placeholder='Last Name'></input>
                </form>
            </div>
        
        </div>
    )
}

export default ShippingSelect