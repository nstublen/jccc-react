import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';

import { DataStore } from './DataStore';
import MultiDayWeatherPage from './components/MultiDayWeatherPage';
import SingleDayWeatherDetailPage from './components/SingleDayWeatherDetailPage';

let url = "http://localhost:3200/owm/forecast/daily?zip=66210,us";

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      numberOfDays: 0,
      dailyData: []
    }
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          city: json.city.name,
          numberOfDays: json.cnt,
          dailyData: json.list
        })
      })
  }

  render() {
    return (
      <DataStore.Provider value={this.state}>
        <Router history={history}>
          <div className="App">
            <header>
              <h1>Forecast for {this.state.city}</h1>
            </header>
            <Switch>
              <Route path="/" exact component={MultiDayWeatherPage} />
              <Route path="/singleday/:dt" exact component={SingleDayWeatherDetailPage} />
            </Switch>
          </div>
        </Router>
      </DataStore.Provider>
    );
  }
}

export default App;
