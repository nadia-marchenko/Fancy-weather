import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.svg$/));

class TodayWeather extends Component {
  render() {
    return (
      <>
        <h1 className="location">Minsk, Belarus</h1>
        <p className="current-date lead">Mon 25 May 2020 15:09</p>
        <Container>
          <Row>
            <Col>
            <div className="square">
	            <span></span>
	            <span></span>
	            <span></span>
              <div className="content">		
                <object className="icon-weather" data="images/rainy-7.svg" type="image/svg+xml">Your browser does not support SVG</object>
                <h5 className="text-weather">Possible light rain</h5>
		            <p className="weather-degree">13°C</p>
                <p className="feels-like-weather">LIKE 14°C</p>
                <p className="humidity">Humidity: 73%</p>
                <p className="humidity">Wind: 1 M/S</p>
	            </div>
            </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TodayWeather;