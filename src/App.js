import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OldTimeline from './components/OldTimeline';
import TestTimeline from './components/TestTimeline';


class App extends Component {
  render() {
    return (
      // <OldTimeline />
      <TestTimeline />
    );
  }
}

export default App;
