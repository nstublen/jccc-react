import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
    // TODO: Double-click on a cell to allow editing. The
    // cell content should be replaced with a form that
    // can be "submitted" locally to update the data.

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortBy: null,
            descending: false
        }
    }

    _sort(event) {
        let column = event.target.cellIndex;
        let descending = this.state.sortBy === column && !this.state.descending;
        let data = this.state.data.slice();
        data.sort((a, b) => {
            let sort = 0;
            if (a[column] > b[column]) { sort = 1; }
            if (a[column] < b[column]) { sort = -1; }
            if (this.state.descending) {
                sort = -sort;
            }
            return sort;
        })
        this.setState({
            data: data,
            sortBy: column,
            descending: descending
        })
    }

    render() {
        return (
            <table>
                <thead onClick={this._sort.bind(this)}>
                    <tr>
                        {
                            this.props.headers.map((header, index) => {
                                let arrow = "";
                                if (index === this.state.sortBy) {
                                    arrow = this.state.descending ? '\u2191' : '\u2193';
                                }
                                return <th key={`header-${index}`}>
                                    {header}
                                    {arrow}
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map((datum, datumIndex) =>
                            <tr key={`data-row-${datumIndex}`}>
                                {
                                    datum.map((item, itemIndex) =>
                                        <td key={`data-col-${itemIndex}`}>
                                            {item}
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}

Excel.propTypes = {
    headers: PropTypes.array.isRequired,
    initialData: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default Excel;
