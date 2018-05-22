import React, { Component } from 'react';

import './TaskItem.css';

class TaskItem extends Component {
    onCheckClick(event) {
        this.props.onCheck(this.props.item.id,
                           event.target.checked);
    }

    onDeleteClick(event) {
        this.props.onDelete(this.props.item.id);
    }

    render() {
        // this.props.item
        // this.props.onCheck
        // this.props.onDelete

        let isChecked = (this.props.item.completedTime != null);

        return <div>
            <input type="checkbox" checked={isChecked} onChange={this.onCheckClick.bind(this)} />
            <span>{this.props.item.text}</span>
            <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        </div>
    }
}

export default TaskItem;
