import React, { Component } from 'react';

import SingleDayWeather from './SingleDayWeather';

class SingleDayWeatherDetail extends Component {
    render() {
        // this.props.oneDayData

        return <SingleDayWeather data={this.props.oneDayData} />
    }
}

export default SingleDayWeatherDetail;
