import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortBy: null,
            descending: false,
            edit: null
        }
    }

    _showEditor(event) {
        if (event.target.tagName === "INPUT") {
            return;
        }
        let column = event.target.cellIndex;
        let row = parseInt(event.target.dataset.row, 10);
        this.setState({
            edit: {
                column,
                row
            }
        })
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

    _save(event) {
        event.preventDefault();
        let input = event.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.column] = input.value;
        this.setState({
            edit: null
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
                <tbody onDoubleClick={this._showEditor.bind(this)}>
                    {
                        this.state.data.map((datum, datumIndex) =>
                            <tr key={`data-row-${datumIndex}`}>
                                {
                                    datum.map((item, itemIndex) => {
                                        if (this.state.edit && this.state.edit.column === itemIndex && this.state.edit.row === datumIndex) {
                                            item = (
                                                <form onSubmit={this._save.bind(this)}>
                                                    <input defaultValue={item} autoFocus={true} />
                                                </form>
                                            );
                                        }
                                        return <td key={`data-col-${itemIndex}`} data-row={datumIndex}>
                                            {item}
                                        </td>
                                    })
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
