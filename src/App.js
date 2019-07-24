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
      if (this.state.result.slice(-1) === ".") {

      }
      else {
        this.setState({
          result: this.state.result + button
        })
      }
    }
    else if (button === "+" || button === "-" || button === "*" || button === "/") {
      if (this.state.result.slice(-1) === "+" || this.state.result.slice(-1) === "-" || this.state.result.slice(-1) === "*" || this.state.result.slice(-1) === "/") {
        this.setState({
          result: this.state.result.slice(0,-1) + button
        })
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
        <div className="calculator-body">
          <h1>Simple Calculator</h1>
          <ResultComponent result={this.state.result} />
          <KeypadComponent onClick={this.onClick} />
          <ReactFCCtest />
        </div>
      </div>
    )
  }
}

export default App;
