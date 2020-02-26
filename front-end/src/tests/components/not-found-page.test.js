import React from 'react';
<<<<<<< HEAD
import NotFoundPage from '../../components/not-found-page';
=======
import NotFoundPage from '../../components/NotFoundPage';
>>>>>>> 2411ca756a1a655b2b54cd94da58e147b6afe002
import {shallow} from 'enzyme'


test('should render 404 page',()=>{
    const wrapper = shallow(<NotFoundPage />)
    expect(wrapper).toMatchSnapshot()
})