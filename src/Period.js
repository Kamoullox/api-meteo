import React, { Component } from 'react';
import "./Period.css"

class Period extends Component {
    state = { 

     }
    render() { 
        let period = this.props.period;
        let imgUrl = "http://openweathermap.org/img/wn/"+period.weather[0].icon+"@2x.png";
        let indexTabDays = this.props.indexNextDays + this.props.indexOfDay
        if (indexTabDays > 7) {
            indexTabDays -= 7;
        }
        // console.log('start');
        // console.log(`index du jour: ${this.props.indexOfDay} + index prochaine jour: ${this.props.indexNextDays}`);
        // console.log(`Egal =  ${indexTabDays} `);
        // console.log('end');

        // let cityName = this.props.result.city.name;
        return ( 
            <div className="period">
                <h2>{indexTabDays === 0 ? this.props.days[indexTabDays] : this.props.days[indexTabDays-1]}</h2>

                {/* <span className="">{period.dt_txt}</span> */}
                {/* <span> {period.weather[0].description}</span> */}
                <img src={imgUrl} alt="icone"/>
                <span> {period.main.temp} °C</span>
            </div>
        )
    }
        
}

 
export default Period;