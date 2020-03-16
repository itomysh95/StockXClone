import React from 'react';
import JumbotronBanner from './jumbotron-banner'
import ItemBanner from './item-banner'
import News from './news'
import PageEnd from './page-bottom/page-end'
import PopularDisplay from './popular-display/popular-display-container';

// home page
const DashboardPage=()=>(
    <div>
        <JumbotronBanner />
        <ItemBanner />
        <PopularDisplay />
        <News />
        <PageEnd />
    </div>
);

export default DashboardPage;