import React,{useState, useEffect} from 'react'
import BuyNow from './buy-now'
import BidNow from './bid-now'
import SellNow from './sell-now'
import AskNow from './ask-now'
import { connect } from 'react-redux'

const NewEntry = (props)=>{
    console.log(props)
    const [buyNow,setBuyNow]=useState(props.buy)
    const [bidNow,setBidNow]=useState()
    const [askNow,setAskNow]=useState(props.buy)
    const [sellNow,setSellNow]=useState()
    const [isLoading, setIsLoading]=useState(true)
    // bid/ask/buy/sell amount
    const [accountRates,setAccountRates]=useState([])
    const [shippingRate,setShippingRate]=useState([]);
    useEffect(()=>{
        const fetchRates = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch()
                const rates = await res.json()
                setAccountRates({...rates})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        // if the account is logged in but missing account rates, retrieve the account rates
        if(props.loggedIn&&!props.accountRates.shippingRate){
            fetchRates()
        }// else use stnadard account / guest account rates
        else{
            setShippingRate(1.15)
        }
        
    },[])
    let shipping ='$--';
    if(props.sizeInfo.price){
        shipping=`$${(parseFloat(props.sizeInfo.price.slice(1))*(1+shippingRate)).toFixed(2)}`
    }
    return(
        <div className='container'>
            {
                props.buy?
                    <div className='side-by-side'>
                        <button type='button' className='' onClick={()=>{
                            setBuyNow(true)
                            setBidNow(false)
                        }}>Buy Now</button>
                        <button type='button' className='' onClick={()=>{
                            setBidNow(true)
                            setBuyNow(false)
                        }}>Place Bid</button>
                    </div>
                :
                    <div className='side-by-side'>
                        <button type='button' className='' onClick={()=>{
                            setSellNow(true)
                            setAskNow(false)
                        }}>Sell Now</button>
                        <button type='button' className='' onClick={()=>{
                            setAskNow(true)
                            setSellNow(false)
                        }}>Place Ask</button>
                    </div>
            }    
            {
                buyNow?
                    <BuyNow shipping={shipping}
                        sizeInfo={props.sizeInfo}
                        cont={props.cont}
                        screens={props.changeScreen}
                        prev={props.prev}
                        buy={props.buy}
                    />
                    :<div></div>
            }
            {
                bidNow?
                    <BidNow shipping={shipping}
                    sizeInfo={props.sizeInfo}
                    cont={props.cont}
                    screens={props.changeScreen}
                    prev={props.prev}
                    buy={props.buy}
                    />
                    :<div></div>
            }
            {
                askNow?
                    <AskNow shipping={shipping}
                    sizeInfo={props.sizeInfo}
                    cont={props.cont}
                    screens={props.changeScreen}
                    prev={props.prev}
                    buy={props.buy}
                    />
                    :<div></div>
            }
            {
                sellNow?
                    <SellNow shipping={shipping} 
                    sizeInfo={props.sizeInfo}
                    cont={props.cont}
                    screens={props.changeScreen}
                    prev={props.prev}
                    buy={props.buy}
                    />
                    :<div></div>
            }
        </div>
    )
}


const mapStateToProps = (state)=>{
    return{
        loggedIn: state.account.loggedIn
    }
}
// call to connect that pulls it all together
export default connect(mapStateToProps)(NewEntry);