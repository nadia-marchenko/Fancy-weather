/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
/* eslint-enable no-unused-vars */
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../../assets', true, /\.svg$/));

class LocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Default',
      time: Date.now(),
      viewport: {
        width: 290,
        height: 420,
        latitude: 53.9000,
        longitude: 27.5667,
        zoom: 8,
      },
      timezoneName: '',
      error: '',
    };
  }

  componentDidMount() {
    fetch('https://ipinfo.io/json?token=0add77f89947b1')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          city: json.city,
          viewport: {
            width: 290,
            height: 420,
            latitude: Number(json.loc.slice(0, 7)),
            longitude: Number(json.loc.slice(8, 15)),
            zoom: 8,
          },
        });
      })
      .catch((err) => {
        throw new Error('Error happened during fetching!', err);
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ city: nextProps.inputValue });
    this.showSearchResults(nextProps.inputValue);
  }

  showSearchResults(city) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?key=e5e8ed2435fc4fe88822361aab7a26ac&q=${city}&pretty=1`)
      .then((res) => res.json())
      .then((json) => {
        this.checkErrors(json);
        this.setState({
          viewport: {
            width: 290,
            height: 420,
            latitude: json.results[0].geometry.lat,
            longitude: json.results[0].geometry.lng,
            zoom: 8,
          },
          city: this.props.inputValue,
          timezoneName: json.results[0].annotations.timezone.name,
        });
        this.props.updateTimeZoneName(json.results[0].annotations.timezone.name);
      })
      .catch((err) => {
        throw new Error('Error happened during fetching!', err);
      });

    this.interval = setInterval(() => this.setState({ error: '' }), 8000);
  }

  checkErrors(response) {
    if (response.total_results === 0) {
      this.setState({
        error: 'No results',
      });
      throw Error(response.message);
    }
  }

  toNormalView(num) {
    return `${Math.trunc(num)}°${num.toString().split('.')[1].slice(0, 2)}'`;
  }

  render() {
    const geolocateStyle = {
      float: 'left',
      margin: '10px',
    };

    return (
      <>
      <div className="location-block">
        <h5 className='no-results'>{this.state.error.length > 0 ? this.state.error : '' }</h5>
        <ReactMapGL
        style={{ margin: '0 auto', borderRadius: '7%' }}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={'pk.eyJ1Ijoia3JvdG9rb24iLCJhIjoiY2thd2R0YTU1MDR0ZDJ5bXpyd2lidmVkZSJ9.gKBq_wdxx-DJ4FH6aHbj8Q'}
        mapStyle="mapbox://styles/mapbox/streets-v11">
           <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
        />
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>
        <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude}
          offsetLeft={-20} offsetTop={-30}>
          <img src='images/location.svg' alt='Location Icon'></img>
        </Marker>
        </ReactMapGL>
        <p className="coordinates">Latitude: {this.toNormalView(this.state.viewport.latitude)}, Longitude: {this.toNormalView(this.state.viewport.longitude)}</p>
      </div>
      </>
    );
  }
}

export default LocationComponent;
