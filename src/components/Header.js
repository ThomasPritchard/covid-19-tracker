import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryNames: this.props.countries,
      countryValue: "",
    };
  }

  handleChange(event) {
    this.setState({
      countryNames: this.props.countries,
      countryValue: event.target.value,
    });
  }

  render() {
    const optionsArray = this.state.countryNames.map((item) => (
      <option>{item}</option>
    ));
    return (
      <div>
        <header>
          <div className="header-container">
            <div className="header-main">
              <div className="logo">Covid-19 Tracker</div>
              <form>
                <label>Select Country: </label>
                <select
                  onChange={(event) => {
                    this.handleChange(event);
                    this.props.submitChange(event, event.target.value);
                  }}
                  value={this.state.countryValue}
                >
                  {optionsArray}
                </select>
              </form>
            </div>
            <hr></hr>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
