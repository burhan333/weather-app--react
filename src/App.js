import { useState, useEffect } from 'react';
import './App.css';

const api = {
  key: "394e086dc25428d23c8612823924702f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(() => {
        fetch(`${api.base}weather?q=karachi&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data => setWeather(data))
        console.log(weather)
        console.log(weather.name)
    }, [])

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(data => {
                setWeather(data)
                setQuery('')
            })
        }
    }

    const handleDate = () => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let d = new Date();
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }

    setTimeout(function() {
        console.log(weather)
        console.log(weather.name)
    }, 1000)
    

    // function func() {
    //     console.log(weather.main.temp);
    // }
    
    
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 30) ? 'app warm' : 'app') : 'app'}>
            <div className="container">
                <div className="search-box">
                <input 
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={handleSearch}
                />
                </div>
                {typeof weather.main !== 'undefined' &&
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{handleDate()}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                                <div className="feel">
                                    Feels Like {Math.round(weather.main.feels_like)}°
                                </div>
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;