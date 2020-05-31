import React, { Component } from 'react';
import ControlBlock from './ControlBlock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodayWeather from './TodayWeather';
import LocationComponent from './LocationComponent';

class PageComponent extends Component {
  constructor() {
    super();
    this.state = {
      typeDegree: 'celsium'
    }
    this.toCelsium = (value) => {
      this.setState({ typeDegree: value })
    }
  }

  render() {
    return (
      <>
        <ControlBlock toCelsium = {this.toCelsium}/>
        <Container>
          <Row>
            <Col lg={6} sm={12}>
            <TodayWeather degreeType = {this.state.typeDegree}/>
            </Col>
            <Col lg={6} sm={12}>
              <LocationComponent/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PageComponent;
