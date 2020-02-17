import React from 'react'
import SocialMedia from './social-media'
import Information from './information'
import PopularLinks from './popular-links'

// component for bottom of page

const PageEnd = ()=>(
    <div>
        <PopularLinks />
        <SocialMedia />
        <Information />
    </div>
)

export default PageEnd