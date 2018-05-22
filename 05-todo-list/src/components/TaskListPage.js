import React, { Component } from 'react';

import TaskEntry from './TaskEntry';
import TaskList from './TaskList';

class TaskListPage extends Component {
    render() {
        return <div>
            <TaskEntry />
            <TaskList />
        </div>;
    }
}

export default TaskListPage;
