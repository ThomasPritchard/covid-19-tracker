import React, { Component } from "react";
import Cards from "./Cards";

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
        <h2>
          Covid-19 Statistics for {this.state.country.Country} (Last 24-hours)
        </h2>
        <Cards
          newConfirmed={this.state.country.NewConfirmed}
          totalConfirmed={this.state.country.TotalConfirmed}
          newDeaths={this.state.country.NewDeaths}
          totalDeaths={this.state.country.TotalDeaths}
        />
      </div>
    );
  }
}

export default CovidStats;
