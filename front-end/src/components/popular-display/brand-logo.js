
import {Link} from 'react-router-dom'


const BrandLogo = (props)=>{
    return(
        <div>
            <h3>{props.brandName}</h3>
            <h2>TODO Insert Image here</h2>
            <p>AMOUNT SOLD: {props.sold}</p>
        </div>
    )
}

export default BrandLogo