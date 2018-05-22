import React, { Component } from 'react';

import { DataStore } from '../DataStore';
import MultiDayWeather from './MultiDayWeather';

class MultiDayWeatherPage extends Component {
    render() {
        return <DataStore.Consumer>
            {
                data => (
                    <MultiDayWeather numberOfDays={data.numberOfDays}
                                     dailyData={data.dailyData} />
                )
            }
        </DataStore.Consumer>
    }
}

export default MultiDayWeatherPage;
