//api.covid19api.com/total/dayone/country/united-kingdom

import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class CovidLineGraph extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      countryValue: this.props.countryValue,
      apiData: {},
    };
  }

  handleApiData(data) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: "Number of daily deaths",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };
    // Run through the data.
    // Extract the date from each one and add it to labels
    // Extract the value from each one
    let date = "";
    let prevDeaths = 0;
    let totalDeaths = 0;
    let deathDifference = 0;
    for (let i = 0; i < data.length; i++) {
      date = data[i].Date.slice(0, 10);
      this.data.labels.push(date);
      totalDeaths = data[i].Deaths;
      deathDifference = totalDeaths - prevDeaths;
      this.data.datasets[0].data.push(deathDifference);
      prevDeaths = totalDeaths;
    }
  }

  runApiCall(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((data) => {
        this.handleApiData(data);
        this.setState({
          countryValue: this.props.countryValue,
          apiData: data,
        });
      })
      .catch((error) =>
        console.log("Error with fetching API about country: ", error)
      );
  }

  componentDidMount() {
    // Run the API call here.
    const url =
      "https://api.covid19api.com/total/dayone/country/united-kingdom";
    this.runApiCall(url);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.countryValue !== this.props.countryValue) {
      // Do a brand new API call.
      // Reset the state. (built into api call)
      let formattedCountry = this.props.countryValue
        .toLowerCase()
        .replace(/\s/g, "-");
      console.log(formattedCountry);
      if (formattedCountry === "united-states-of-america") {
        formattedCountry = "united-states";
      }
      const url = `https://api.covid19api.com/total/dayone/country/${formattedCountry}`;
      this.runApiCall(url);
    }
  }

  render() {
    let d = new Date();
    return (
      <div className="outer-chart-container">
        <div className="inner-chart-container">
          <h2>
            Visualised Chart (Updated:{" "}
            {d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()})
          </h2>
          <Line data={this.data} />
        </div>
      </div>
    );
  }
}

export default CovidLineGraph;
