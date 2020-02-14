import React from 'react';
import News from '../../components/News'
import {shallow} from 'enzyme'

test('should render News component',()=>{
    const wrapper = shallow(<News />)
})