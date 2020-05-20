import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class CovidPieChart extends Component {
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
          backgroundColor: ["#005eb8", "#ff197d"],
          borderColor: "#005eb8",
          borderWidth: 0.5,
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
      this.data = {
        labels: ["Total Confirmed", "Total Deaths"],
        datasets: [
          {
            label: "United Kingdom",
            backgroundColor: ["#005eb8", "#ff197d"],
            borderColor: "#005eb8",
            borderWidth: 0.5,
            data: [this.props.totalConfirmed, this.props.totalDeaths],
          },
        ],
      };
      this.setState({
        totalConfirmed: this.props.totalConfirmed,
        totalDeaths: this.props.totalDeaths,
        date: this.props.date,
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
            Visualised Chart (Updated: {formattedDate} at {formattedTime})
          </h2>
          <Pie data={this.data} />
        </div>
      </div>
    );
  }
}
export default CovidPieChart;
