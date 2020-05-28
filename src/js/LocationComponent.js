import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import IPinfo from 'node-ipinfo';
import Helper from './Helper';
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.png$/));

class LocationComponent extends Component {

  constructor() {
    super();
    this.state = { city: 'Default' };
  }

  // geocode(ymaps) {
  //   ymaps.geocode('Мытищи')
  //     .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
  // }

  // async fetchLocation() {
  //   const URL = `https://ipinfo.io/json`;
  //   await Helper.fetchPost(URL)
  //     .then((content) => console.log(content))
  //     .then((content) => console.log(content))
  //     .catch((error) => {
  //       throw new Error(`${error}: Problems with API`);
  //     });
  // }

  componentDidMount() {
    fetch(`https://ipinfo.io/json?token=0add77f89947b1`)
      .then(res => res.json())
      // .then(json => console.log(json.city))
      .then(json => this.setState({ city: json.city }));
  }

  // geocode(ymaps) {
  //   ymaps.geocode('Минск', { results: 1})
  //     .then((res) => {
  //           var firstGeoObject = res.geoObjects.get(0),
  //               coords = firstGeoObject.geometry.getCoordinates(),
  //               bounds = firstGeoObject.properties.get('boundedBy');

            // firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
            // myMap.geoObjects.add(firstGeoObject);
            // myMap.setBounds(bounds, {
            //     checkZoomRange: true
    // })
  //   })
  // }

  render() {
    return (
      <>
      <div className="location-block">
        {/* <YMaps query={{ lang: 'en_RU', apikey: '6505618d-7100-448c-af26-75f6ee70583a'}}>
           <Map width={'auto'} height={800} modules={["geocode"]} onLoad={ymaps => {
                                this.geocode(ymaps);
                            }}> */}
            {/* <SearchControl state={{ request: 'Минск', }} options={{ provider: 'yandex#search', float: 'left', placeholderContent: 'Аптеки' }} /> */}


            {/* { !this.state.coordinates ? null :
              <Placemark geometry={{ coordinates: this.state.coordinates}} />
            } */}
{/* 
          </Map>
        </YMaps> */}
        <Image src="images/test-map.png" fluid/>
        <p className="coordinates">Latitude: 53°54', Longitude: 27°34'</p>
        <p>{this.state.city}</p>
      </div>
      </>
    );
  }
}

export default LocationComponent;