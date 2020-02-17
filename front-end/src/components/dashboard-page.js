import React from 'react';
import JumbotronBanner from './jumbotron-banner'
import ItemBanner from './item-banner'
import FrontPageItems from './front-page-items'
import News from './news'
import PageEnd from './page-bottom/page-end'

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