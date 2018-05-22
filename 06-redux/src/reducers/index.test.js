import { incrementCount, decrementCount } from '../actions';
import counterApp from './index';

it("increments the count", () => {
    let action = incrementCount();
    let state = {
        count: 1
    };

    let newState = counterApp(state, action);
    expect(newState.count).toEqual(state.count + 1);
})

it("decrements the count", () => {
    let action = decrementCount();
    let state = {
        count: 1
    };

    let newState = counterApp(state, action);
    expect(newState.count).toEqual(state.count - 1);
})

it("is greater than or equal to zero", () => {
    let action = decrementCount();
    let state = {
        count: 0
    };

    let newState = counterApp(state, action);
    expect(newState.count).toEqual(0);
})

it("is less than or equal to ten", () => {
    let action = incrementCount();
    let state = {
        count: 10
    };

    let newState = counterApp(state, action);
    expect(newState.count).toEqual(10);
})
