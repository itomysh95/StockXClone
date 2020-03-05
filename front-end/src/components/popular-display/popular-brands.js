import React from 'react'
import {connect} from 'react-redux'

const PopularBrands=()=>{

    return(
    <div>
        <h3 align='center'>Popular Brands</h3>
    </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        
    }
}

export default connect(mapStateToProps)(PopularBrands)