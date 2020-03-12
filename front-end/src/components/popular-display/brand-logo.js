
import {Link} from 'react-router-dom'


const BrandLogo = (props)=>{
    return(
        <div>
            <h3>{props.brandName}</h3>
            <p>{props.sold}</p>
        </div>
    )
}

export default BrandLogo