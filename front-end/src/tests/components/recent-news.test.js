import React from 'react';
import RecentNews from '../../components/recent-news'
import {shallow} from 'enzyme'

test('should render RecentNews component',()=>{
    const wrapper = shallow(<RecentNews />)
})