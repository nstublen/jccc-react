import { INCREMENT, DECREMENT } from '../actions';

const initialState = {
    count: 0
};

function counterApp(state = initialState, action) {
    switch (action.type) {
    case INCREMENT:
        state = Object.assign({}, state, { count: Math.min(10, state.count + 1) });
        break;
    case DECREMENT:
        state = Object.assign({}, state, { count: Math.max(0, state.count - 1) });
        break;
    default:
        break;
    }
    return state;
}

export default counterApp;
