import React from 'react';
import {shallow} from 'enzyme';
<<<<<<< HEAD
import DashboardPage from '../../components/dashboard-page'
=======
import DashboardPage from '../../components/DashboardPage'
>>>>>>> 2411ca756a1a655b2b54cd94da58e147b6afe002


test('should render the expense dashboard page',()=>{
    const wrapper = shallow(<DashboardPage />)
    expect(wrapper).toMatchSnapshot()
})