import React from 'react';
import Banner from '../../components/Banner'
import {shallow} from 'enzyme'

test('should render Banner component',()=>{
    wrapper = shallow(<Banner />)
})