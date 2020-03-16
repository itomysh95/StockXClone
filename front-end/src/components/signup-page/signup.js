import React,{useState} from 'react'

const SignupScreen = (props)=>{
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
                TODO Sign Up With Twitter
                </button>
            </div>
            <div className='container' id="facebook-container">
                <button type="button" id="facebook-signup">
                        TODO Sign Up With Facebook
                </button>
            </div>
            <span id="hr-or">OR</span>
            <hr id="hr-signup" />
            <div className="form-group has-feedback">
                <input className='form-control' type='text' id='AccountName' placeholder='Account Name' onChange={e => props.setAccountName(e.target.value)}/>
            </div>
            <div className="form-group has-feedback">
                <input className='form-control' type='email' id='Email' placeholder='Email Address' 
                    onChange={e => props.setEmail(e.target.value)} autoComplete="on"
                />
            </div>
            <div className="form-group has-feedback">
                <input className='form-control' type='password' id='Password' placeholder='Password' 
                    onChange={e => props.setPassword(e.target.value)} autoComplete="on"
                />
                <span className="fa fa-eye-slash form-control-feedback" onClick={()=>reveal()} />
            </div>
            <div>
                <p><b>At least 8 characters, 1 uppercase letter, 1 number & 1 symbol</b></p>
                <input type="checkbox"/>
                <p>By signing up, you agree to the Terms of Service and Privacy Policy </p>
                <input type="submit" value="Sign Up" />
            </div>
        </div>
    )
}

export default SignupScreen