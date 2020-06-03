import React, { Component } from 'react';
import ControlBlock from './ControlBlock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodayWeather from './TodayWeather';
import LocationComponent from './LocationComponent';
import {Helmet} from "react-helmet";
class PageComponent extends Component {
  constructor() {
    super();
    this.state = {
      typeDegree: 'celsium',
      backgroundImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      inputValue: 'Minsk',
      country: 'Default'
    }
    this.toCelsium = (value) => {
      this.setState({ typeDegree: value })
    }

    this.updateBackground = () => {
      let month = (new Date()).toLocaleString('en-US', {month: 'long'});
      fetch(`https://api.unsplash.com/photos/random?query=${month},${this.getTimeOfDay()}&client_id=wt8xARyWojWBc5XCOs0WUFLmgLWca1c5yo4sO6d9kgo&orientation=landscape`)
        .then(res => res.json())
        .then(json => {
          console.log(json),
          this.setState({ 
            backgroundImg: json.urls.regular
            })
        })
        .catch(err => {
          console.log('Error happened during fetching!', err);
        });
    }
    this.updateInputValue = (value) => {
      this.setState({inputValue : value});
    }

    this.updateCountry = (value) => {
      this.setState({country: value});
    }
  }

  getTimeOfDay() {
    let data = [
      [0, 4, "night"], 
      [5, 11, "morning"],
      [12, 17, "afternoon"],
      [18, 24, "night"]
    ],
    hr = new Date().getHours();
  
    for(var i = 0; i < data.length; i++){
      if(hr >= data[i][0] && hr <= data[i][1]){
          return data[i][2];
      }
    }
  }

  render() {
    return (
      <>
      <Helmet bodyAttributes={{style: `background : linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.state.backgroundImg}); background-repeat: no-repeat; background-position: center center; background-attachment: fixed; background-size: cover;`}}/>
        <ControlBlock toCelsium = {this.toCelsium} updateBackground = {this.updateBackground} updateInputValue = {this.updateInputValue}/>
        <Container>
          <Row>
            <Col lg={6} sm={12}>
            <TodayWeather degreeType = {this.state.typeDegree} inputValue = {this.state.inputValue} />
            </Col>
            <Col lg={6} sm={12}>
              <LocationComponent inputValue = {this.state.inputValue} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PageComponent;
