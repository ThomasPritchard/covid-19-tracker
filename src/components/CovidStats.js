import React, { Component } from "react";

class CovidStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.setState({
        country: this.props.country,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Covid-19 Statistics for {this.state.country.Country}</h2>
        <ul>
          <li>New Confirmed Cases: {this.state.country.NewConfirmed}</li>
          <li>Total Confirmed Cases: {this.state.country.TotalConfirmed}</li>
          <li>New Deaths: {this.state.country.NewDeaths}</li>
          <li>Total Deaths: {this.state.country.TotalDeaths}</li>
        </ul>
      </div>
    );
  }
}

export default CovidStats;
