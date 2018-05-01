import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
    // TODO: Extend the component's state to include the
    // current column used for sorting and whether it should
    // use a descending sort.

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData
        }
    }

    _sort(event) {
        let column = event.target.cellIndex;
        let data = this.state.data.slice();
        data.sort((a, b) => a[column] > b[column] ? 1 : -1)
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <table>
                <thead onClick={this._sort.bind(this)}>
                    <tr>
                        {
                            this.props.headers.map((header, index) =>
                                <th key={`header-${index}`}>
                                    {header}
                                </th>
                            )
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
