import React, { Component } from "react";
import ReactMapGL, { GeolocateControl, NavigationControl} from 'react-map-gl';
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.png$/));

class LocationComponent extends Component {

  constructor() {
    super();
    this.state = { 
      city: 'Default',
      time: Date.now(),
      viewport: {
        width: 290,
        height: 420,
        latitude: 53.9000,
        longitude: 27.5667,
        zoom: 8
      }
    };
  }

  componentDidMount() {
    fetch(`https://ipinfo.io/json?token=0add77f89947b1`)
      .then(res => res.json())
      .then(json => this.setState({ 
        city: json.city ,
        latitude: json.loc.slice(0,5),
        longitude: json.loc.slice(8,13)
      }));
  }

toNormalView(num) {
  return `${Math.trunc(num)}°${num.toString().split('.')[1].slice(0,2)}'`;
}

  render() {
    const geolocateStyle = {
      float: "left",
      margin: "10px"
    };

    return (
      <>
      <div className="location-block">
        <ReactMapGL 
        style={{margin: '0 auto'}}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={'pk.eyJ1Ijoia3JvdG9rb24iLCJhIjoiY2thd2R0YTU1MDR0ZDJ5bXpyd2lidmVkZSJ9.gKBq_wdxx-DJ4FH6aHbj8Q'}
        mapStyle="mapbox://styles/mapbox/streets-v11">
           <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
        />
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
        </ReactMapGL>
        {/* <Image src="images/test-map.png" fluid/> */}
        <p className="coordinates">Latitude: {this.toNormalView(this.state.viewport.latitude)}, Longitude: {this.toNormalView(this.state.viewport.longitude)}</p>
      </div>
      </>
    );
  }
}

export default LocationComponent;