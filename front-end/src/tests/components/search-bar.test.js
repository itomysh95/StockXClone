import React from 'react';
import {shallow} from 'enzyme'
import SearchBar from '../../components/search-bar'

test('should render SearchBar component',()=>{
    const wrapper = shallow(<SearchBar />)
})