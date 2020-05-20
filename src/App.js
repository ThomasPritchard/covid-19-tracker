import React, { Component } from "react";
import Header from "./components/Header";
import CovidStats from "./components/CovidStats";
import CovidPieChart from "./components/CovidPieChart";
import "./styles.css";
import CovidLineGraph from "./components/CovidLineGraph";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiData: {},
      loading: true,
      countryValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    fetch(url)
      .then((response) => response.json())
      .then((returnData) => {
        this.setState(() => {
          return {
            apiData: returnData,
            loading: false,
            countryValue: "United Kingdom",
          };
        });
      });
  }

  handleChange(event, name) {
    this.setState((prevState) => {
      return {
        apiData: prevState.apiData,
        loading: false,
        countryValue: name,
      };
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      const mappedArray = this.state.apiData.Countries.map(
        (item) => item.Country
      );
      const index = mappedArray.indexOf(this.state.countryValue);
      return (
        <div>
          <Header countries={mappedArray} submitChange={this.handleChange} />
          <CovidStats country={this.state.apiData.Countries[index]} />
          <CovidLineGraph countryValue={this.state.countryValue} />
          <CovidPieChart
            totalConfirmed={this.state.apiData.Countries[index].TotalConfirmed}
            totalDeaths={this.state.apiData.Countries[index].TotalDeaths}
            date={this.state.apiData.Countries[index].Date}
          />
        </div>
      );
    }
  }
}

export default App;
