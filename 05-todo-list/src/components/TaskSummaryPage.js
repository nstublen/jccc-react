import React, { Component } from 'react';

import DataStore from '../DataStore';

class TaskSummaryPage extends Component {
    render() {
        return <DataStore.Consumer>
            {
                data => {
                    // data.items

                    let completeCount = 0;
                    for (let index = 0; index < data.items.length; index++) {
                        if (data.items[index].completedTime) {
                            completeCount++;
                        }
                    }

                    let incompleteCount = data.items.length - completeCount;

                    return <div>
                            <div>Complete items: {completeCount}</div>
                            <div>Incomplete items: {incompleteCount}</div>
                        </div>;
                }
            }
        </DataStore.Consumer>;
    }
}

export default TaskSummaryPage;
