import React from 'react';
import JumbotronBanner from './JumbotronBanner'
import ItemBanner from './ItemBanner'
import FrontPageItems from './FrontPageItems'
import News from './News'
import PageEnd from './pageBottom/PageEnd'

// home page
const DashboardPage=()=>(
    <div>
        <JumbotronBanner />
        <ItemBanner />
        <FrontPageItems />
        <News />
        <PageEnd />
    </div>
);

export default DashboardPage;