import React from 'react';
import FrontPageItems from '../../components/FrontPageItems'
import {shallow} from 'enzyme'

test('should render FrontPageItems component',()=>{
    wrapper = shallow(<FrontPageItems />)
})