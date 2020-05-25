import React, { Component } from 'react';
import ControlBlock from './ControlBlock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodayWeather from './TodayWeather';

class PageComponent extends Component {
  render() {
    return (
      <>
        <ControlBlock/>
        <Container>
          <Row>
            <Col>
            <TodayWeather/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PageComponent;
