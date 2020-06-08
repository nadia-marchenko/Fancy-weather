/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet';
import WeatherComponent from './WeatherComponent';
import LocationComponent from './LocationComponent';
import ControlBlock from './ControlBlock';
/* eslint-enable no-unused-vars */
class PageComponent extends Component {
  constructor() {
    super();
    this.state = {
      typeDegree: 'celsium',
      backgroundImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      inputValue: 'Minsk',
      country: 'Default',
      timezoneName: '',
    };
    this.toCelsium = (value) => {
      this.setState({ typeDegree: value });
    };

    this.updateBackground = () => {
      const month = (new Date()).toLocaleString('en-US', { month: 'long' });
      fetch(`https://api.unsplash.com/photos/random?query=${month},${this.getTimeOfDay()}&client_id=HkL2_h-g79V4Sxb89Ioo4upRjr0n1qp6coF84GC3IWI&orientation=landscape`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            backgroundImg: json.urls.regular,
          });
        })
        .catch((err) => {
          throw new Error('Error happened during fetching!', err);
        });
    };
    this.updateInputValue = (value) => {
      this.setState({ inputValue: value });
    };

    this.updateCountry = (value) => {
      this.setState({ country: value });
    };

    this.updateTimeZoneName = (value) => {
      this.setState({ timezoneName: value });
    };
  }

  getTimeOfDay() {
    const data = [
      [0, 4, 'night'],
      [5, 11, 'morning'],
      [12, 17, 'afternoon'],
      [18, 24, 'night'],
    ];
    const hr = new Date().getHours();
    let res = '';

    for (let i = 0; i < data.length; i += 1) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        res = data[i][data[i].length - 1];
      }
    }
    return res;
  }

  render() {
    return (
      <>
      <Helmet bodyAttributes={{ style: `background : linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.state.backgroundImg}); background-repeat: no-repeat; background-position: center center; background-attachment: fixed; background-size: cover;` }}/>
        <ControlBlock toCelsium = {this.toCelsium} updateBackground = {this.updateBackground}
          updateInputValue = {this.updateInputValue}/>
        <Container>
          <Row>
            <Col lg={6} sm={12}>
            <WeatherComponent
              degreeType = {this.state.typeDegree}
              inputValue = {this.state.inputValue}
              timezoneName = {this.state.timezoneName} />
            </Col>
            <Col lg={6} sm={12}>
              <LocationComponent
                inputValue = {this.state.inputValue}
                updateTimeZoneName = {this.updateTimeZoneName} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PageComponent;
