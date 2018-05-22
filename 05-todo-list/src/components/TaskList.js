import React, { Component } from 'react';

import './TaskList.css';

import DataStore from '../DataStore';
import TaskItem from './TaskItem';

class TaskList extends Component {
    render() {
        return <DataStore.Consumer>
            {
                data => {
                    // Use data (which is the "value" on the Provider)...
                    // data.items...

                    // Map each "item" into a <TaskItem> component
                    // and pass the item as a prop for the component.
                    return data.items.map(item => {
                        return <TaskItem key={`item-${item.id}`}
                                         item={item}
                                         onCheck={data.onCheckItem}
                                         onDelete={data.onDeleteItem} />
                    });
                }
            }
            </DataStore.Consumer>
    }
}

export default TaskList;
