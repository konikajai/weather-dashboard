import React, { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Jaipur');
    const [thisLocation, setLocation] = useState('');

    const fetchWeather = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(apiUrl);
            console.log(response.data);

            setLocation(response.data.name);
            setWeather({
                temperature: response.data.main.temp,
                windSpeed: response.data.wind.speed,
                humidity: response.data.main.humidity,
                visibility: response.data.visibility,
                iconString: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                conditions: response.data.weather[0].description,
              });

            setValues([]);
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    console.log(weather.temperature + ' t');
    console.log(weather.humidity + ' h');

    return (
        <StateContext.Provider value={{weather, setPlace, values, thisLocation, place}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
