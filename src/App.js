import React, { Component } from "react";
import "./App.css";

const pulsar = process.env.PUBLIC_URL + "/images/pulsar.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={pulsar} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
