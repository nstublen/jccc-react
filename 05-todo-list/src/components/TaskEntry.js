import React, { Component } from 'react';

import './TaskEntry.css';

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

    onSubmit(event) {
        event.preventDefault();
        let text = this.refs.taskTextInput.value;
        this.props.onAdd(text);
        this.setState({
            value: ""
        });
    }

    render() {
        return <form onSubmit={this.onSubmit.bind(this)}>
            <input ref="taskTextInput" type="text"
                   value={this.state.value}
                   placeholder="Enter your task here..."
                   onChange={this.onChange.bind(this)} />
            <input type="submit" />
        </form>
    }
}

export default TaskEntry;
