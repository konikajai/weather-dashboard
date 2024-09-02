import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'
import { useStateContext } from '../Context';

const WeatherCard = () => {

  const CardStyle = {
    width: '22rem',
    minWidth: '22rem',
    height: '30rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const { weather, Location } = useStateContext();
  const [icon, setIcon] = useState(sun)
  const { time } = useDate()


  useEffect(() => {
    if (weather.iconString) {
      if (weather.iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (weather.iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (weather.iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (weather.iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (weather.iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (weather.iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (weather.iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [weather.iconString]);

  return (
    <div style ={CardStyle}>
      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-5xl flex justify-center items-center' >{weather.temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {Location}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{weather.windSpeed} km/h</p></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{weather.humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Visibility</p>
        <p className='text-lg'>{weather.visibility}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {weather.conditions}
      </div>
    </div>
  )
}

export default WeatherCard