import React from 'react'
import SocialMedia from './SocialMedia'
import Information from './Information'
import PopularLinks from './PopularLinks'

// component for bottom of page

const PageEnd = ()=>(
    <div>
        <PopularLinks />
        <SocialMedia />
        <Information />
    </div>
)

export default PageEnd