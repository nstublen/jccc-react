import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementCount, incrementCount } from '../actions';

class Counter extends Component {
    render() {
        return <div>
                <button onClick={this.props.decrement}>Decrement</button>
                { this.props.count }
                <button onClick={this.props.increment}>Increment</button>
            </div>;
    }
}

const mapStateToProps = state => ({
    count: state.count
});

const mapDispatchToProps = dispatch => ({
    decrement: () => dispatch(decrementCount()),
    increment: () => dispatch(incrementCount())
});

Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default Counter;
