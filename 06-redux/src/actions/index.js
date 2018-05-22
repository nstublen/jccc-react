export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";

export function decrementCount() {
    return { type: DECREMENT };
}

export function incrementCount() {
    return { type: INCREMENT };
}
