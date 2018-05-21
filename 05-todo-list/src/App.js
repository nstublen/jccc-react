import React, { Component } from 'react';
import './App.css';

import DataStore from './DataStore';
import TaskEntry from './components/TaskEntry';
import TaskList from './components/TaskList';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      onDeleteItem: function (id) {
          console.log("Deleted " + id);
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

  render() {
    return (
      <DataStore.Provider value={this.state}>
        <div className="App">
          <h1>To Do List</h1>
          <TaskEntry onAdd={this.onAdd.bind(this)} />
          <TaskList />
        </div>
      </DataStore.Provider>
    );
  }
}

export default App;
