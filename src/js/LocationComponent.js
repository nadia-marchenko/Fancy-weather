import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.png$/));

class LocationComponent extends Component {
  render() {
    return (
      <>
      <div className="location-block">
        <Image src="images/test-map.png" fluid/>
        <p className="coordinates">Latitude: 53°54', Longitude: 27°34'</p>
      </div>
      </>
    );
  }
}

export default LocationComponent;