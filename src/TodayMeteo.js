import React, { Component } from 'react';
import "./TodayMeteo.css";

class TodayMeteo extends Component {
    state = { 

     }
    render() { 
        let today = this.props.today;
        let city = this.props.city;
        let imgUrl = "http://openweathermap.org/img/wn/"+today.weather[0].icon+"@2x.png";
        console.log(city);
        return ( 
            <div className="todayMeteo">
                <div className="icone">
                    <img className="" src={imgUrl} alt="icone"/>
                </div>

                <div className="detail">
                    <span className="">Aujourd'hui</span>
                    <span className="city"> { city } </span>
                    <span> {today.weather[0].description}</span>
                    <span> Température {today.main.temp} °C</span>
                </div>
            </div>
         );
    }
}
 
export default TodayMeteo;