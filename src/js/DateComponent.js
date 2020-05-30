import React, { Component } from "react";

class DateComponent extends Component {
  constructor() {
    super();
    let optionsForDate = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    this.state = { 
      date: new Date().toLocaleString('en-US', optionsForDate),
    };
  }

  componentDidMount() {
    let optionsForDate = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    this.interval = setInterval(() => this.setState({ date: new Date().toLocaleString('en-US', optionsForDate) }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <>
        <p className="current-date lead">{this.state.date}</p>
      </>
    );
  }

}

export default DateComponent;