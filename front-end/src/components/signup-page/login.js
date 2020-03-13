import React,{useState} from 'react'

const LoginScreen = (props)=>{
    const [revealPass,setRevealPass] = useState(false)
    const reveal = ()=>{
        if(revealPass){
            document.getElementById('Password').type='text';
        }else{
            document.getElementById('Password').type='password';
        }
        setRevealPass(!revealPass)
    }
    return(
        <div className='container' id="signup-container">
            <div className='container' id="twitter-container">
                <button type="button" id="twitter-signup">
                    TODO Login With Twitter
                </button>
            </div>
            <div className='container' id="facebook-container">
                <button type="button" id="facebook-signup">
                    TODO Login With Facebook
                </button>
            </div>
            <span id="hr-or">OR</span>
            <hr id="hr-signup" />
            <div className="form-group has-feedback">
                <input className='form-control' type='email' id='Email' placeholder='Email Address' onChange={e => props.setEmail(e.target.value)}/>
            </div>
            <div className="form-group has-feedback">
                <input className='form-control' type='password' id='Password' placeholder='Password' onChange={e => props.setPassword(e.target.value)} />
                <span className="fa fa-eye-slash form-control-feedback" onClick={()=>reveal()} />
            </div>
            <div>
                <input type="submit" value="Login" />
                <p>By logging in, you agree to the Terms of Service and Privacy Policy </p>
            </div>
        </div>
    )
}

export default LoginScreen