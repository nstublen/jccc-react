import React, { Component } from 'react';

import './TaskEntry.css';

import DataStore from '../DataStore';

class TaskEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    onChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    onSubmit(event, data) {
        event.preventDefault();
        let text = this.state.value;
        data.onAddItem(text);
        this.setState({
            value: ""
        });
    }

    render() {
        return <DataStore.Consumer>
            {
                data => {
                    return <form onSubmit={event => this.onSubmit(event, data)}>
                        <input type="text"
                            value={this.state.value}
                            placeholder="Enter your task here..."
                            onChange={this.onChange.bind(this)} />
                        <input type="submit" />
                    </form>
                }
            }
            </DataStore.Consumer>;
    }
}

export default TaskEntry;
