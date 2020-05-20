import React, { Component } from "react";
import CountUp from "react-countup";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newConfirmed: this.props.newConfirmed,
      totalConfirmed: this.props.totalConfirmed,
      newDeaths: this.props.newDeaths,
      totalDeaths: this.props.totalDeaths,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalConfirmed !== this.props.totalConfirmed &&
      prevProps.totalDeaths !== this.props.totalDeaths
    ) {
      this.setState({
        newConfirmed: this.props.newConfirmed,
        totalConfirmed: this.props.totalConfirmed,
        newDeaths: this.props.newDeaths,
        totalDeaths: this.props.totalDeaths,
      });
    }
  }

  render() {
    const duration = 4;
    return (
      <div className="cards">
        <div className="card-item">
          <div className="card-title">
            Confirmed
            <hr></hr>
          </div>
          <div>
            New: <CountUp end={this.state.newConfirmed} duration={duration} />
          </div>
          <div>
            Total:{" "}
            <CountUp end={this.state.totalConfirmed} duration={duration} />
          </div>
        </div>
        <div className="card-item">
          <div className="card-title">
            Deaths
            <hr></hr>
          </div>
          <div>
            New: <CountUp end={this.state.newDeaths} duration={duration} />
          </div>
          <div>
            Total: <CountUp end={this.state.totalDeaths} duration={duration} />
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
