import React,{useState} from 'react'
import BuyNow from './buy-now'
import BidNow from './bid-now'

const NewEntry = (props)=>{
    const [buyNow,setBuyNow]=useState(true)
    // bid/ask/buy/sell amount
    let shipping ='$--';
    if(props.sizeInfo.price){
        shipping=`$${(parseFloat(props.sizeInfo.price.slice(1))/10+10).toFixed(2)}`
    }

    let details = {
        buy:'Buy Now',
        bid:'Bid',
        shipping
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
                        sizeInfo={props.sizeInfo}
                        cont={props.cont}
                        screens={props.changeScreen}
                        prev={props.prev}
                    />
                    :
                    <BidNow details={details} 
                        sizeInfo={props.sizeInfo}
                        cont={props.cont}
                        screens={props.changeScreen}
                        prev={props.prev}
                    />
            }
        </div>
    )
}

export default NewEntry