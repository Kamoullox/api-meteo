import React, { Component } from 'react';
import "./TodayMeteo.css";

class TodayMeteo extends Component {
    state = { 

     }
    render() { 
        let today = this.props.today;
        let imgUrl = "http://openweathermap.org/img/wn/"+today.weather[0].icon+"@2x.png";
        return ( 
            <div className="todayMeteo">
                {/* <h1>{this.props.week[this.props.day-1]}</h1> */}
                <span className="">Aujourd'hui</span>
                <span> {today.weather[0].description}</span>
                <img src={imgUrl} alt="icone"/>
                <span> {today.main.temp} °C</span>
            </div>
         );
    }
}
 
export default TodayMeteo;