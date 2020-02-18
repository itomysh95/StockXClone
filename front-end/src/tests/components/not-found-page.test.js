import React from 'react';
import NotFoundPage from '../../components/not-found-page';
import {shallow} from 'enzyme'


test('should render 404 page',()=>{
    const wrapper = shallow(<NotFoundPage />)
    expect(wrapper).toMatchSnapshot()
})