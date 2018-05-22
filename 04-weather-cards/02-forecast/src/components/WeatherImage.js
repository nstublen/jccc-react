import React, { Component } from 'react';

// class WeatherImage extends Component {
//     render() {
//         // this.props.icon

//         return <img src={`/images/${this.props.icon}.png`} />
//     }
// }

function WeatherImage(props) {
    return <img src={`/images/${props.icon}.png`} />
}

export default WeatherImage;
