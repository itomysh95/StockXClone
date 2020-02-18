import React from 'react';
import FrontPageItems from '../../components/front-page-items'
import {shallow} from 'enzyme'

test('should render FrontPageItems component',()=>{
    const wrapper = shallow(<FrontPageItems />)
})