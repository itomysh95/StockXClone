import React,{useState} from 'react'
import Countries from './country-region'

const ShippingSelect = (props)=>{
    const [fullName,setFullName]=useState('')
    const [addressOne,setAddressOne]=useState('')
    const [addressTwo,setAddressTwo]=useState('')
    const [city,setCity]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [country,setCountry]=useState('')
    const [zipCode,setZipCode]=useState('')
    const [province,setProvince]=useState('')
    let shippingDetails = {
        fullName,
        addressOne,
        addressTwo,
        city,
        phoneNumber,
        country,
        zipCode,
        province
    }
    return(
        <div className='container col-sm-8'>
            <div className='container shipping-screen'>
                <h1 align='left' >Shipping</h1>
                <h3 align='left' className='font-color-grey'>Please provide your shipping info</h3>

                <div className='container' align='center'>
                    <h3>Shipping Info</h3>
                    <form>
                        <input id="shipping-name"
                            type="text"
                            placeholder="Full name" 
                            required 
                            className="form-control"
                            onChange={(event)=>{
                                setFullName(event.target.value)
                            }} 
                        />
                        <Countries setCountry={setCountry} setProvince={setProvince} />
                        <input 
                            id="shipping-address"
                            type="text"
                            placeholder="Address"
                            required
                            className="form-control"
                            onChange={(event)=>{
                                setAddressOne(event.target.value)
                            }}
                        />
                        <input 
                            id="shipping-address-two"
                            type="text" 
                            placeholder="Address 2" 
                            required
                            className="form-control"
                            onChange={(event)=>{
                                setAddressTwo(event.target.value)
                            }}
                        />
                        <input 
                            id="shipping-city"
                            type="text" 
                            placeholder="city" 
                            required
                            className="form-control"
                            onChange={(event)=>{
                                setCity(event.target.value)
                            }} 
                        />
                        <input 
                            id="shipping-zip-code"
                            type="text"
                            placeholder="Zip Code"
                            required
                            value={zipCode}
                            className='form-control'
                            maxLength="6"
                            onChange={(event)=>{
                                setZipCode(event.target.value)
                            }}
                        />
                        <input 
                            id="shipping-phoneNumber"
                            type="text" 
                            placeholder="phonenumber" 
                            required
                            className="form-control"
                            onChange={(event)=>{
                                setPhoneNumber(event.target.value)
                            }} 
                        />
                    </form> 
                </div>
            </div>
            <div className='container prev-next-buttons'>
                <input type="button" className="btn btn-danger" value='Prev' id='prev-order-details' onClick={()=>{
                    props.screens("payment")
                }}>
                </input>
                <input 
                    type="button" 
                    className="btn btn-success" 
                    value='Next' 
                    id='next-order-details' 
                    onClick={()=>{
                        props.setShippingInfo(shippingDetails)
                        props.screens("confirm")
                    }
                }>
                </input>
            </div>
        </div>
    )
}

export default ShippingSelect