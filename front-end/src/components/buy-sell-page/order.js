import React,{useState,useEffect} from 'react'
import PaymentSelect from './create entry/payment-screen'
import ShippingSelect from './shipping/shipping-select'
import SizeSelect from './size-page/size-select'
import ConfirmOrder from './confirm/confirm-order'

// component for order for size chosen
const Order=(props)=>{
    const [sizeSelectScreen, setSizeSelectScreen]=useState(true)
    const [paymentScreen,setPaymentScreen]=useState(false)
    const [shippingScreen, setShippingScreen]=useState(false)
    const [confirmScreen,setConfirmScreen]=useState(false)
    const [loading,setLoading]=useState(false)
    const [sizeInfo,setSizeInfo] = useState([])
    const [paymentInfo,setPaymentInfo]=useState({})
    const [shippingInfo,setShippingInfo]=useState([])
    const [isBuy,setIsBuy]=useState(props.buy)

    useEffect(()=>{
        setLoading(true)
        setSizeSelectScreen(true)
        setLoading(false)
    },[])

    const changeScreen = (screen='')=>{
        switch(screen){
            case 'payment':
                setLoading(true)
                setSizeSelectScreen(false)
                setShippingScreen(false)
                setConfirmScreen(false)
                setPaymentScreen(true)
                setLoading(false)
                return
            case 'shipping':
                setLoading(true)
                setSizeSelectScreen(false)
                setPaymentScreen(false)
                setConfirmScreen(false)
                setShippingScreen(true)
                setLoading(false)
                return
            case 'size':
                setLoading(true)
                setShippingScreen(false)
                setPaymentScreen(false)
                setConfirmScreen(false)
                setSizeSelectScreen(true)
                setLoading(false)
                return
            case 'confirm':
                setLoading(true)
                setShippingScreen(false)
                setPaymentScreen(false)
                setSizeSelectScreen(false)
                setConfirmScreen(true)
                setLoading(false)
            default:
                return
        } 
    }
    return(
        <div className='container'>
            {
                loading?<p>Loading...</p>:
                <div>
                    {
                        sizeSelectScreen?<SizeSelect buy={props.buy} name={props.name} sizeData={props} screens={changeScreen} setSizeInfo={setSizeInfo}/>:<div></div>
                    }
                    {
                        paymentScreen?<PaymentSelect setPaymentInfo={setPaymentInfo} buy={props.buy} screens={changeScreen} sizeInfo={sizeInfo}  isBuy={isBuy} />:<div></div>
                    }
                    {
                        shippingScreen?<ShippingSelect setShippingInfo={setShippingInfo} screens={changeScreen}/>:<div></div>
                    }
                    {
                        confirmScreen?<ConfirmOrder sizeInfo={sizeInfo} paymentInfo={paymentInfo} shippingInfo={shippingInfo} screens={changeScreen} history={props.history} name={props.name} isBuy={isBuy} />:<div></div>
                    }
                </div>
            }
            <div className='container position-relative'>
                <input type="button" className="btn btn-danger" value='Cancel Order' id='cancel-order' onClick={()=>{
                    history.back(-1)}
                }>
                </input>
            </div> 
        </div>
    )
}

export default Order