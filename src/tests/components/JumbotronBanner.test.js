import React from 'react';
import {shallow} from 'enzyme'
import JumbotronBanner from '../../components/JumbotronBanner'

test('should render JumbotronBanner component',()=>{
    const wrapper = shallow(<JumbotronBanner />)
})