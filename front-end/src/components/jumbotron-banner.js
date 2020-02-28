import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap';
import SearchBar from './search-bar'


class JumbotronBanner extends Component {
    render(){
        return(
            <div>
                <Jumbotron>
                    <div className='container-fluid box-layout' id='Jumbo-Banner'>
                        <div className="container md-form mt-0">
                            <h1 className="display-4" >BUY AND SELL</h1>
                            <h1 className="display-3">Clinton's Authentic Sneakers in Canada</h1>
                            <SearchBar />
                        </div>
                    </div>
                </Jumbotron>
            </div>
        )
    }
}

export default JumbotronBanner;