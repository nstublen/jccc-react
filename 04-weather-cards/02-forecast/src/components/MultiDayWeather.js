import React, { Component } from 'react';

import SingleDayWeather from './SingleDayWeather';

class MultiDayWeather extends Component {
    render() {
        // this.props.numberOfDays
        // this.props.dailyData

        if (!this.props.dailyData) {
            return <div>Loading...</div>;
        }

        return <div>
            {
                this.props.dailyData.map((oneDayData, index) => {
                    return <SingleDayWeather key={`day-${index}`} data={oneDayData} />
                })
            }
        </div>;
    }
}

export default MultiDayWeather;
