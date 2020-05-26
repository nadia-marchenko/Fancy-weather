import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.svg$/));


class WeatherNextDaysComponent extends Component {
  render() {
    return (
      <>
      <Container className="forecast">
        <Row lg={6} md={12} xs={12}>
          <Col>
            <h2 className="day-weeks">Tuesday</h2>
            <p>
              <span className="forecast-weather">13°C</span>
              <object className="icon" data="images/rainy-3.svg" type="image/svg+xml">Your browser does not support SVG</object>
            </p>
          </Col>
          <Col>
            <h2 className="day-weeks">Wednesday</h2>
            <p>
              <span className="forecast-weather">15°C</span>
              <object className="icon" data="images/rainy-6.svg" type="image/svg+xml">Your browser does not support SVG</object>
            </p>
          </Col>
          <Col>
            <h2 className="day-weeks">Thursday</h2>
            <p>
              <span className="forecast-weather">12°C</span>
              <object className="icon" data="images/rainy-1.svg" type="image/svg+xml">Your browser does not support SVG</object>
            </p>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default WeatherNextDaysComponent;