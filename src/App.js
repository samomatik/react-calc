import React, { Component } from 'react';
import ReactFCCtest from 'react-fcctest';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeypadComponent from './components/KeypadComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: "0"
    }
  }

  onClick = button => {
    if (button === "=") {
      this.calculate()
    }
    else if (button === "C") {
      this.reset()
    }
    else if (button === "CE") {
      this.backspace()
    }
    else if (button === ".") {
      var expression = this.state.result;
      var copy = expression;

      expression = expression.replace(/[0-9]+/g, "#").replace(/[(||.)]/g, "");
      var numbers = copy.split(/[^0-9.]+/);
      var operators = expression.split("#").filter(function (n) { return n });
      var result = [];

      for (var i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
        if (i < operators.length) result.push(operators[i]);
      }

      if (result[result.length -1].includes('.')) {

      }
      else {
        this.setState({
          result: this.state.result + button
        })
      }
    }
    else if (button === "+" || button === "*" || button === "/") {
      if (this.state.result.slice(-1) === "+" || this.state.result.slice(-1) === "*" || this.state.result.slice(-1) === "/") {
        this.setState({
          result: this.state.result.slice(0,-1) + button
        })
      }
      else if (this.state.result.slice(-1) === "-") {
        this.setState({
          result: this.state.result.slice(0, -2) + button
        })
      }
      else {
        this.setState({
          result: this.state.result + button
        })
      }
    }
    else if (button === "-") {
      if (this.state.result.slice(-1) === "-") {

      }
      else {
        this.setState({
          result: this.state.result + button
        })
      }
    }
    else {
      if (this.state.result === "0") {
        this.setState({
          result: button
        })
      }
      else {
        this.setState({
          result: this.state.result + button
        })
      }
    }
  }

  calculate = () => {
    try {
      this.setState({
        // eslint-disable-next-line
        result: (eval(this.state.result) || "") + ""
      })
    } catch (e) {
      this.setState({
        result: "error"
      })
    }
  };

  reset = () => {
    this.setState({
      result: "0"
    })
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    })
  };

  render() {
    return (
      <div>
        <h1>Simple Calculator</h1>
        <div className="calculator-body">
          <ResultComponent result={this.state.result} />
          <KeypadComponent onClick={this.onClick} />
          <ReactFCCtest />
        </div>
      </div>
    )
  }
}

export default App;
