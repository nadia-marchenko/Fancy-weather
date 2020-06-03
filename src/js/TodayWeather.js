import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WeatherIcon from 'react-icons-weather';
// Import images
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../assets', true, /\.svg$/));

class TodayWeather extends Component {
  constructor() {
    super();
    this.state = { 
      date: new Date(),
      city: 'Default',
      celsiumNowDegree: '0',
      feelsLikeWeather: '0',
      humidity: '0',
      wind: '0',
      summary: 'Default',
      img: '200',
      firstDayForecast: this.nextDay(1),
      secondDayForecast: this.nextDay(2),
      thirdDayForecast: this.nextDay(3),
      firstDayForecastWeather: '',
      secondDayForecastWeather: '',
      thirdDayForecastWeather: '',
      firstDayForecastImg: '200',
      secondDayForecastImg: '200',
      thirdDayForecastImg: '200'
    };
    let apiWeather = '33ecad8be411fae2e033205ca91551fb';
  }

  nextDay(numDays) {
    return (new Date(new Date().setDate(new Date().getDate() + numDays)));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ date: new Date() }), 1000);
 
    fetch(`https://ipinfo.io/json?token=0add77f89947b1`)
    .then(res => res.json())
    .then(cityResponse => 
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityResponse.city}&lang=en&units=metric&APPID=33ecad8be411fae2e033205ca91551fb`)
      .then(res => res.json())
      .then(weatherResponse => 
        this.setState({ 
          city: cityResponse.city, 
          celsiumNowDegree: Math.ceil(weatherResponse.list[0].main.temp),
          feelsLikeWeather: Math.ceil(weatherResponse.list[0].main.feels_like),
          humidity: weatherResponse.list[0].main.humidity,
          wind: weatherResponse.list[0].wind.speed,
          summary: weatherResponse.list[0].weather[0].main,
          img: weatherResponse.list[0].weather[0].id,
          firstDayForecastWeather: this.averageWeather(weatherResponse, this.state.firstDayForecast),
          secondDayForecastWeather: this.averageWeather(weatherResponse, this.state.secondDayForecast),
          thirdDayForecastWeather: this.averageWeather(weatherResponse, this.state.thirdDayForecast),
          firstDayForecastImg: this.getForecastImg(weatherResponse, this.state.firstDayForecast),
          secondDayForecastImg: this.getForecastImg(weatherResponse, this.state.secondDayForecast),
          thirdDayForecastImg: this.getForecastImg(weatherResponse, this.state.thirdDayForecast)
        }))
        .catch(err => {
          console.log('Error happened during fetching!', err);
        })
    );
  }

  averageWeather(weatherResponse, date) {
    return Math.ceil(weatherResponse.list
      .filter(el => el.dt_txt.includes(date
      .toJSON().slice(0,10)))
      .map((el) => el.main.temp)
      .reduce((a,b) => a + b)
      /8);
  }

  getForecastImg(weatherResponse, date) {
    return weatherResponse.list.filter(el => el.dt_txt.includes(date.toJSON().slice(0,10)))[0].weather[0].id;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toFarengeit(degreeInCelsium) {
    return Math.ceil((degreeInCelsium * 1.8) + 32);
  }

  render() {
    let optionsForDate = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    let farengeitNowDegree = this.toFarengeit(this.state.celsiumNowDegree);
    let farengeitFirstDayForecat = this.toFarengeit(this.state.firstDayForecastWeather);
    let farengeitSecondDayForecat = this.toFarengeit(this.state.secondDayForecastWeather);
    let farengeitThirdDayForecat = this.toFarengeit(this.state.thirdDayForecastWeather);
    let farengeitFeelsLikeWeather = this.toFarengeit(this.state.feelsLikeWeather);

    return (
      <>
        <h1 className="location">{this.state.city}, Belarus</h1>
        <p className="current-date lead">{this.state.date.toLocaleString('en-US', optionsForDate)}</p>
        <Container>
          <Row>
            <Col>
            <div className="square">
	            <span></span>
	            <span></span>
	            <span></span>
              <div className="content">
                <WeatherIcon name="owm" className='icon-weather icon' iconId={this.state.img.toString()} flip="horizontal" rotate="90" fixedWidth={true}/>
                {/* <object className="icon-weather" data="images/rainy-7.svg" type="image/svg+xml">Your browser does not support SVG</object>  */}
                <h5 className="text-weather">{this.state.summary}</h5>
                <p className="weather-degree">{ this.props.degreeType == 'celsium' ? this.state.celsiumNowDegree + '°C' : farengeitNowDegree + '°F'}</p>
                <p className="feels-like-weather">LIKE: { this.props.degreeType == 'celsium' ? this.state.feelsLikeWeather + '°C' : farengeitFeelsLikeWeather + '°F'}</p>
                <p className="humidity">Humidity: {this.state.humidity}%</p>
                <p className="humidity">Wind: {this.state.wind} M/S</p>
	            </div>
            </div>
            </Col>
          </Row>
        </Container>
        <Container className="forecast">
        <Row>
          <Col>
            <h2 className="day-weeks">{this.state.firstDayForecast.toLocaleString('en-US', { weekday: 'long' })}</h2>
            <p>
              <span className="forecast-weather">{ this.props.degreeType == 'celsium' ? this.state.firstDayForecastWeather + '°C' : farengeitFirstDayForecat + '°F'}</span>
              <WeatherIcon name="owm" className='icon icon-weather icon-forecast' iconId={this.state.firstDayForecastImg.toString()} flip="horizontal" rotate="270"/>
              {/* <object className="icon" data="images/rainy-3.svg" type="image/svg+xml">Your browser does not support SVG</object> */}
            </p>
          </Col>
          <Col>
            <h2 className="day-weeks">{this.state.secondDayForecast.toLocaleString('en-US', { weekday: 'long' })}</h2>
            <p>
              <span className="forecast-weather">{ this.props.degreeType == 'celsium' ? this.state.secondDayForecastWeather + '°C' : farengeitSecondDayForecat + '°F'}</span>
              <WeatherIcon name="owm" className='icon icon-weather icon-forecast' iconId={this.state.secondDayForecastImg.toString()} flip="horizontal" rotate="270"/>
              {/* <object className="icon" data="images/rainy-6.svg" type="image/svg+xml">Your browser does not support SVG</object> */}
            </p> 
          </Col>
          <Col>
            <h2 className="day-weeks">{this.state.thirdDayForecast.toLocaleString('en-US', { weekday: 'long' })}</h2>
            <p>
              <span className="forecast-weather">{ this.props.degreeType == 'celsium' ? this.state.thirdDayForecastWeather + '°C' : farengeitThirdDayForecat + '°F'}</span>
              <WeatherIcon name="owm" className='icon icon-weather icon-forecast' iconId={this.state.thirdDayForecastImg.toString()} flip="horizontal" rotate="270"/>
              {/* <object className="icon" data="images/rainy-1.svg" type="image/svg+xml">Your browser does not support SVG</object> */}
            </p>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default TodayWeather;