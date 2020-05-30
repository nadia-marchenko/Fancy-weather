import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DateComponent from "./DateComponent";
import WeatherIcon from 'react-icons-weather';
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.svg$/));

class TodayWeather extends Component {
  constructor() {
    super();
    this.state = { 
      city: 'Default',
      nowDegree: '0',
      feelsLikeWeather: '0',
      humidity: '0',
      wind: '0',
      summary: 'Default',
      img: '0'
    };
    let apiWeather = '33ecad8be411fae2e033205ca91551fb';
  }

  componentDidMount() {
      fetch(`https://ipinfo.io/json?token=0add77f89947b1`)
      .then(res => res.json())
      .then(cityResponse => 
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityResponse.city}&lang=en&units=metric&APPID=33ecad8be411fae2e033205ca91551fb`)
        .then(res => res.json())
        .then(weatherResponse => 
          this.setState({ 
            city: cityResponse.city, 
            nowDegree: Math.ceil(weatherResponse.list[0].main.temp), 
            feelsLikeWeather: Math.ceil(weatherResponse.list[0].main.feels_like),
            humidity: weatherResponse.list[0].main.humidity,
            wind: weatherResponse.list[0].wind.speed,
            summary: weatherResponse.list[0].weather[0].main,
            img: weatherResponse.list[0].weather[0].id
          }))
      );
  }

  render() {
    return (
      <>
        <h1 className="location">{this.state.city}, Belarus</h1>
        <DateComponent/>
        <Container>
          <Row>
            <Col>
            <div className="square">
	            <span></span>
	            <span></span>
	            <span></span>
              <div className="content">
                <WeatherIcon name="owm" className='icon icon-weather' iconId="200" flip="horizontal" rotate="270"/>
                {/* <object className="icon-weather" data="images/rainy-7.svg" type="image/svg+xml">Your browser does not support SVG</object>  */}
                <h5 className="text-weather">{this.state.summary}</h5>
                <p className="weather-degree">{this.state.nowDegree}°C</p>
                <p className="feels-like-weather">LIKE {this.state.feelsLikeWeather}°C</p>
                <p className="humidity">Humidity: {this.state.humidity}%</p>
                <p className="humidity">Wind: {this.state.wind} M/S</p>
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