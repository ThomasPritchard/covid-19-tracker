import React, { Component } from "react";
import Header from "./components/Header";
import CovidStats from "./components/CovidStats";
import CovidChart from "./components/CovidChart";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiData: {},
      loading: true,
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
            countryValue: "",
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
      let index;
      if (this.state.countryValue !== "") {
        index = mappedArray.indexOf(this.state.countryValue);
      } else {
        index = mappedArray.indexOf("United Kingdom");
      }
      return (
        <div>
          <Header countries={mappedArray} submitChange={this.handleChange} />
          <CovidStats country={this.state.apiData.Countries[index]} />
          <CovidChart
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
