import React from 'react';
import News from '../../components/News'
import {Shallow} from 'enzyme'

test('should render News component',()=>{
    wrapper = shallow(<News />)
})