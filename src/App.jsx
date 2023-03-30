import React from "react";

import convert from "convert-units";

import Container from "react-bootstrap/Container";

import SelectUnits from "./components/SelectItemComponent";
import InputField from "./components/InputFieldComponent";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      unitOptionsSelector: "",
      firstUnitOption: "",
      secondUnitOption: "",
      firstInput: 0,
      secondInput: 0,
      flow: "",
    };
  }

  //prepare Unit options
  prepareUnitOptionsSelector = () => {
    return convert()
      .measures()
      .map((ele) => ele[0].toUpperCase() + ele.slice(1));
  };

  //update unit options field with selected value

  handleUnitOptionsSelector = (event) => {
    event.preventDefault();
    this.setState({
      unitOptionsSelector: event.target.value,
      firstUnitOption: "",
      secondUnitOption: "",
      firstInput: 0,
      secondInput: 0,
    });
  };

  //select the units
  handleUnitSelector = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      firstInput: 0,
      secondInput: 0,
    });
  };

  // handle unit input fields
  handleInputFields = (event) => {
    event.preventDefault();
    if (event.target.name === "firstInput") {
      this.setState(
        {
          firstInput: event.target.value,
          flow: "T2B",
        },
        () => this.handleConversion()
      );
    } else if (event.target.name === "secondInput") {
      this.setState(
        {
          secondInput: event.target.value,
          flow: "B2T",
        },
        () => this.handleConversion()
      );
    }
  };

  // handle back and forth unit conversion
  handleConversion = () => {
    if (this.state.flow === "T2B") {
      this.setState({
        secondInput: convert(this.state.firstInput)
          .from(this.state.firstUnitOption)
          .to(this.state.secondUnitOption),
      });
    } else if (this.state.flow === "B2T") {
      this.setState({
        firstInput: convert(this.state.secondInput)
          .from(this.state.secondUnitOption)
          .to(this.state.firstUnitOption),
      });
    }
  };

  render() {
    return (
      <Container fluid="md">
        <SelectUnits
          data={{
            label: "Unit Measurements",
            measurements: convert().measures(),
            populateType: "unitOptionsSelector",
            populateWith: this.prepareUnitOptionsSelector(),
            selectedValue: this.state.unitOptionsSelector,
          }}
          handleUnitSelector={this.handleUnitOptionsSelector}
        />
        {this.state.unitOptionsSelector ? (
          <>
            <SelectUnits
              data={{
                label: "From Unit",
                populateType: "firstUnitOption",
                populateWith: convert().list(this.state.unitOptionsSelector),
                selectedValue: this.state.firstUnitOption,
              }}
              handleUnitSelector={this.handleUnitSelector}
            />
            {this.state.firstUnitOption && this.state.secondUnitOption ? (
              <InputField
                data={{
                  currentValue: this.state.firstInput
                    ? this.state.firstInput
                    : "0",
                  input: this.state.firstUnitOption,
                  label: this.state.firstLabel,
                  name: "firstInput",
                }}
                handleInput={this.handleInputFields}
              />
            ) : (
              <></>
            )}
            <SelectUnits
              data={{
                label: "To Unit",
                populateType: "secondUnitOption",
                populateWith: convert().list(this.state.unitOptionsSelector),
                selectedValue: this.state.secondUnitOption,
              }}
              handleUnitSelector={this.handleUnitSelector}
            />
            {this.state.firstUnitOption && this.state.secondUnitOption ? (
              <InputField
                data={{
                  currentValue: this.state.secondInput,
                  input: this.state.secondUnitOption,
                  label: this.state.secondLabel,
                  name: "secondInput",
                }}
                handleInput={this.handleInputFields}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default App;
