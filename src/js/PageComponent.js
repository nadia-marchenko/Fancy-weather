import React, { Component } from 'react';
import ControlBlock from './ControlBlock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodayWeather from './TodayWeather';
import LocationComponent from './LocationComponent';
import WeatherNextDaysComponent from './WeatherNextDaysComponent';

class PageComponent extends Component {
  render() {
    return (
      <>
        <ControlBlock/>
        <Container>
          <Row>
            <Col lg={6} sm={12}>
            <TodayWeather/>
            </Col>
            <Col lg={6} sm={12}>
              <LocationComponent/>
            </Col>
          </Row>
        </Container>
        <WeatherNextDaysComponent/>
      </>
    );
  }
}

export default PageComponent;
