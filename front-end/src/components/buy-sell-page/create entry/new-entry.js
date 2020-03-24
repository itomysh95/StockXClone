import React,{useState} from 'react'
import BuyNow from './buy-now'
import BidNow from './bid-now'

const NewEntry = (props)=>{
    const [buyNow,setBuyNow]=useState(true)
    // bid/ask/buy/sell amount


    let details = {
        buy:'Buy Now',
        bid:'Bid',
        shipping:`$${(parseFloat(props.size.price.slice(1))/10+10).toFixed(2)}`
    }
    if(!props.buy){
        details['buy']='Sell Now'
        details['bid']='Ask'
    }
    return(
        <div className='container'>
            <div className='side-by-side'>
                <button type='button' className='' onClick={()=>{
                    setBuyNow(true)
                }}>
                    {`${details.buy}`}
                </button>
                <button type='button' className='' onClick={()=>{
                    setBuyNow(false)
                }}>
                    {`Place ${details.bid}`}
                </button>
            </div>
            {
                buyNow?
                    <BuyNow details={details}
                        size={props.size}
                        cont={props.cont}
                        screens={props.changeScreen}
                        prev={props.prev}
                    />
                    :
                    <BidNow details={details} size={props.size} />
            }
        </div>
    )
}

export default NewEntry