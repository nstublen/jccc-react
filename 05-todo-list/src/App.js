import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory} from 'history';

import './App.css';

import DataStore from './DataStore';
import TaskListPage from './components/TaskListPage';
import TaskSummaryPage from './components/TaskSummaryPage';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      onAddItem: (text) => {
        this.onAdd(text);
      },
      onCheckItem: (id, isChecked) => {
        this.onCheck(id, isChecked);
      },
      onDeleteItem: (id) => {
        this.onDelete(id);
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:3400/items")
      .then(response => response.json())
      .then(json => {
        // json.status ?= "OK"
        // json.items --> App's state
        if (json.status === "OK") {
          this.setState({
            items: json.items
          })
        }
      })
  }

  onAdd(text) {
    console.log("Add item: " + text);
    let json = {
      text: text
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(json)
    };

    fetch("http://localhost:3400/items", options)
      .then(response => response.json())
      .then(json => {
        // json.status ?= "OK"
        // json.item, which is the item
        if (json.status === "OK") {
          this.setState({
            items: [...this.state.items, json.item]
          })
        }
      })
  }

  onCheck(id, isChecked) {
    console.log("Update item: " + id);
    let json = {
      id: id,
      completedTime: isChecked ? new Date().getTime() : null
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(json)
    };

    fetch("http://localhost:3400/items/" + id, options)
      .then(response => response.json())
      .then(json => {
        // json.status ?= "OK"
        // json.item, which is the item
        if (json.status === "OK") {
          // json.item
          this.setState({
            items: this.state.items.map(item => item.id === json.id ? json.item : item)
          })
        }
      })
  }

  onDelete(id) {
    console.log("Deleted " + id);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
      method: "DELETE",
      headers: headers
    };

    fetch("http://localhost:3400/items/" + id, options)
      .then(response => response.json())
      .then(json => {
        // json.status ?= "OK"
        // json.item, which is the item
        if (json.status === "OK") {
          this.setState({
            items: this.state.items.filter(item => item.id !== id)
          })
        }
      })
  }

  render() {
    return (
      <DataStore.Provider value={this.state}>
        <div className="App">
          <h1>To Do List</h1>
          <Router history={history}>
            <div>
              <nav>
                <Link to="/list">Link</Link>&nbsp;
                <Link to="/summary">Summary</Link>
              </nav>
              <Switch>
                <Route exact path="/list" component={TaskListPage} />
                <Route exact path="/summary" component={TaskSummaryPage} />
              </Switch>
            </div>
          </Router>
        </div>
      </DataStore.Provider>
    );
  }
}

export default App;
