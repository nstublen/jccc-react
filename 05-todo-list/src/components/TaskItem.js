import React, { Component } from 'react';

import './TaskItem.css';

class TaskItem extends Component {
    onDeleteClick(event) {
        this.props.onDelete(this.props.item.id);
    }

    render() {
        // this.props.item
        // this.props.onDelete

        let isChecked = (this.props.item.completedTime != null);

        return <div>
            {
                // If the item is checked, we render a checked
                // <input>, otherwise, an unchecked <input>.
                isChecked
                    ? <input type="checkbox" checked />
                    : <input type="checkbox" />
            }
            <span>{this.props.item.text}</span>
            <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        </div>
    }
}

export default TaskItem;
