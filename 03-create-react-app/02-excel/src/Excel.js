import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.initialData
        };
    }

    _sort(event) {
        console.log("Sort " + event.target.cellIndex);
        let data = this.state.data.slice();
        data.sort(function (a, b) {
            let aValue = a[event.target.cellIndex];
            let bValue = b[event.target.cellIndex];

            if (aValue < bValue) {
                return -1;
            }
            if (aValue > bValue) {
                return 1;
            }
            return 0;

            // return aValue > bValue ? 1 : -1;
        });

        this.setState({
            data: data
        });
    }

    render() {
        // this.props.headers
        // this.props.initialData

        return <table>
            <thead onClick={(event) => { this._sort(event) }}>
                <tr>
                    {
                        this.props.headers.map((header, index) => {
                            return <th key={"idx-" + index}>
                                { header }
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    this.state.data.map((row, rowIndex) => {
                        return <tr key={"row-" + rowIndex}>
                            {
                                // row is an array of strings
                                // each string is mapped to a <td>
                                row.map((cell, cellIndex) => {
                                    return <td key={"cell-" + cellIndex}>
                                            { cell }
                                        </td>
                                })
                            }
                            </tr>
                    })
                }
            </tbody>
        </table>;
    }
}

Excel.defaultProps = {
    headers: ["A", "B", "C", "D", "E"]
}

Excel.propTypes = {
    headers: PropTypes.array // Of(React.PropTypes.string)
}

export default Excel;
