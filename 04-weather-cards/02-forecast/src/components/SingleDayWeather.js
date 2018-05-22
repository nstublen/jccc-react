import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SingleDayWeather.css';

import WeatherImage from './WeatherImage';

const dayMap = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

class SingleDayWeather extends Component {
    _KtoF(Ktemp) {
        return Math.round((Ktemp - 273) * 9 / 5 + 32);
    }

    render() {
        // this.props.data - a single day of weather information
        console.log(this.props.data.weather);

        let dt = this.props.data.dt;
        let date = new Date(dt * 1000);
        let dow = date.getDay();

        let minTemp = this._KtoF(this.props.data.temp.min);
        let maxTemp = this._KtoF(this.props.data.temp.max);

        return <div className="single-day-weather">
            <Link to={`/singleday/${dt}`}>
                <div>
                    {dayMap[dow]}
                </div>
                <WeatherImage icon={this.props.data.weather[0].icon}/>
                <div>
                    {this.props.data.weather[0].main}
                </div>
                <div>
                    {minTemp}/{maxTemp}
                </div>
            </Link>
        </div>;
    }
}

export default SingleDayWeather;
