import React, { Component } from 'react';
import axios from 'axios';
import Period from "./Period";
import "./BaseMeteo.scss";
import TodayMeteo from './TodayMeteo';


class BaseMeteo extends Component {
    state = { 
        today: [],
        period: [],
        currentCity: "lens",
        indexOfDay: 1,
        days: [
            'Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'
        ],
        sameDays: false
        
    }


    componentDidMount = () => {
        let d = new Date(); // Créer une variable date avec la date du jour
        axios.get ('https://api.openweathermap.org/data/2.5/forecast?q='+this.state.currentCity+'&lang=fr&units=metric&appid=e391e4ab0e327da8c1f398e39a6b666c')
        .then (res => {
            
            // enregistre les informations dans le state une fois la page chargé
            this.setState ({
                period: res.data.list.filter(period => period.dt_txt.includes("12")),
                today: [res.data.list[0]],
                currentCity: res.data.city.name,
                indexOfDay: d.getDay()           
            })
            // Compare le jour du 1er élément res, avec le jour de la 1er prévision qui inclu 12:00
            // Pour vérifier si il s'agit du même jour
            let day1 = this.state.today[0].dt_txt.slice(0,10);
            let day2 = this.state.period[0].dt_txt.slice(0,10);
            if (day1 === day2) {
                this.setState ({
                    sameDays: true      
                })
            }
        })

    }


    handleChangeName = (e) => {
        this.setState ({
            currentCity: e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        axios.get ('https://api.openweathermap.org/data/2.5/forecast?q='+this.state.currentCity.toLowerCase()+'&lang=fr&units=metric&appid=e391e4ab0e327da8c1f398e39a6b666c')
        .then (res => {
            this.setState ({
                period: res.data.list.filter(period => period.dt_txt.includes("12")),
                today: [res.data.list[0]],
                currentCity: res.data.city.name
            })
         })
    }


    render() { 
        
        let indexNextDays; // Création de l'index
        this.state.sameDays ? indexNextDays = -1 : indexNextDays = 0;

        // console.log(indexNextDays);
        let periodList;

        if (this.state.sameDays){
            periodList = this.state.period.slice(0,5).map(period => {
                indexNextDays += 1;
                return <Period period={period} indexOfDay={this.state.indexOfDay} days={this.state.days} indexNextDays={indexNextDays}/>
            }); 
        }
        else {
            periodList = this.state.period.map(period => {
                indexNextDays += 1;
                return <Period period={period} indexOfDay={this.state.indexOfDay} days={this.state.days} indexNextDays={indexNextDays}/>
            }); 
        }
        
       



        let today = this.state.today.map(today => {
            return <TodayMeteo today={today}/>;
        }); 
        
        
        

        // let today = this.state.today;
        // let imgUrl = "http://openweathermap.org/img/wn/"+today.weather[0].icon+"@2x.png";
        return ( 
            <div className="BaseMeteo">
                <div className="container"> 
                    <form onSubmit={this.handleSubmit} >
                        <input className="input is-focus is-medium is-rounded city-input has-text-centered	" type="text" placeholder="Entrer une ville" onChange={this.handleChangeName} value={this.state.currentCity}/>
                    </form>
                </div>
              
            
                <div className="container system-weather">
                    {today}
                    {periodList}
                </div>
            </div>
         );
    }
}
 
export default BaseMeteo;