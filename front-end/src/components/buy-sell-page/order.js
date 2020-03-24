import React,{useState,useEffect} from 'react'
import PaymentSelect from './create entry/payment-screen'
import ShippingSelect from './create entry/shipping-select'
import SizeSelect from './size-page/size-select'

// component for order for size chosen
const Order=(props)=>{
    const [sizeSelectScreen, setSizeSelectScreen]=useState(true)
    const [paymentScreen,setPaymentScreen]=useState(false)
    const [shippingScreen, setShippingScreen]=useState(false)
    const [loading,setLoading]=useState(false)
    const [size,setSize] = useState([])
    const [paymentInfo,setPaymentInfo]=useState({})
    const [shippingInfo,setShippingInfo]=useState([])

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
                setPaymentScreen(true)
                setLoading(false)
                return
            case 'shipping':
                setLoading(true)
                setSizeSelectScreen(false)
                setPaymentScreen(false)
                setShippingScreen(true)
                setLoading(false)
                return
            case 'size':
                setLoading(true)
                setShippingScreen(false)
                setPaymentScreen(false)
                setSizeSelectScreen(true)
                setLoading(false)
                return
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
                        sizeSelectScreen?<SizeSelect buy={props.buy} name={props.name} sizeData={props} screens={changeScreen} setSize={setSize}/>:<div></div>
                    }
                    {
                        paymentScreen?<PaymentSelect setPaymentInfo={setPaymentInfo} buy={props.buy} screens={changeScreen} size={size}/>:<div></div>
                    }
                    {
                        shippingScreen?<ShippingSelect setShippingInfo={setShippingInfo} screens={changeScreen}/>:<div></div>
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