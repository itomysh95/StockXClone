import React, { Component } from 'react';

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to 
// keep file size down
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


class Countries extends Component {
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }

  selectCountry (country) {
    this.setState({ country });
    this.props.setCountry(country)
  }

  selectRegion (region) {
    this.setState({ region });
    this.props.setProvince(region)
  }

  render () {
    const { country, region } = this.state;
    return (
      <div>
        <CountryDropdown
          value={country}
          onChange={(val) => {
            this.selectCountry(val)
          }} />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => {
            this.selectRegion(val)
          }} />
      </div>
    );
  }
}

export default Countries