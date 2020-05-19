import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class CovidChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalConfirmed: this.props.totalConfirmed,
      totalDeaths: this.props.totalDeaths,
      date: this.props.date,
    };
    this.data = {
      labels: ["Total Confirmed", "Total Deaths"],
      datasets: [
        {
          label: "United Kingdom",
          backgroundColor: ["#ffeb3b", "#005eb8"],
          borderColor: "#005eb8",
          borderWidth: 1,
          data: [this.state.totalConfirmed, this.state.totalDeaths],
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalConfirmed !== this.props.totalConfirmed &&
      prevProps.totalDeaths !== this.props.totalDeaths
    ) {
      console.log("Update");
      this.data = {
        labels: ["Total Confirmed", "Total Deaths"],
        datasets: [
          {
            label: "United Kingdom",
            backgroundColor: ["#ffeb3b", "#005eb8"],
            borderColor: "#005eb8",
            borderWidth: 1,
            data: [this.props.totalConfirmed, this.props.totalDeaths],
          },
        ],
      };
      this.setState({
        totalConfirmed: this.props.totalConfirmed,
        totalDeaths: this.props.totalDeaths,
      });
    }
  }

  render() {
    const formattedDate = this.state.date.slice(0, 10);
    const formattedTime = this.state.date.slice(11, this.state.date.length - 1);

    return (
      <div className="outer-chart-container">
        <div className="inner-chart-container">
          <h2>
            Today's Graph (Updated: {formattedDate} at {formattedTime})
          </h2>
          <Pie data={this.data} />
        </div>
      </div>
    );
  }
}
export default CovidChart;
