import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
    // TODO: Add functionality to click on a header
    // cell and sort the data based on the data in that
    // column.

    render() {
        return (
            <table>
                <thead>
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
                        this.props.data.map((datum, datumIndex) =>
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
    data: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default Excel;
