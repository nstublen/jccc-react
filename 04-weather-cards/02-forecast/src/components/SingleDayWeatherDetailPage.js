import React, { Component } from 'react';

import { DataStore } from '../DataStore';
import SingleDayWeatherDetail from './SingleDayWeatherDetail';

class SingleDayWeatherDetailPage extends Component {
    render() {
        return <DataStore.Consumer>
            {
                data => {
                    for (let index = 0; index < data.dailyData.length; index++) {
                        if (data.dailyData[index].dt == this.props.match.params.dt) {
                            return (
                                <SingleDayWeatherDetail oneDayData={data.dailyData[index]} />
                            )
                        }
                    }

                    return <div>Sorry - not found!</div>
                }
            }
            </DataStore.Consumer>
    }
}

export default SingleDayWeatherDetailPage;
