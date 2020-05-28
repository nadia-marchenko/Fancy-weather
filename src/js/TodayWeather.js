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
  constructor() {
    super();
    let optionsForDate = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    this.state = { 
      city: 'Default',
      date: new Date().toLocaleString('en-US', optionsForDate),
    };
  }

  componentDidMount() {
    fetch(`https://ipinfo.io/json?token=0add77f89947b1`)
      .then(res => res.json())
      .then(json => this.setState({ city: json.city }));
    
    let optionsForDate = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    this.interval = setInterval(() => this.setState({ date: new Date().toLocaleString('en-US', optionsForDate) }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <h1 className="location">{this.state.city}, Belarus</h1>
        <p className="current-date lead">{this.state.date}</p>
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