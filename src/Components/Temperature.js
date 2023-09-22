import React from 'react';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CycloneIcon from '@mui/icons-material/Cyclone';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {formatToLocalTime,IconfromUrl } from './WeatherData';

function Temperature({weather:{main,icon,temp,temp_max,temp_min,sunrise,sunset,humidity,speed,feels_like,timezone},degree}) {
  return (
    <div>
    <div className='items-center justify-center flex py-6 text-xl text-cyan-300'>
      <p>{main}</p>
      </div>
    <div className='flex  justify-between flex-row text-white py-3'>
    <img className='w-30' src={IconfromUrl(icon)} alt="" />
    <p className='text-5xl '>{`${temp.toFixed()}°${degree}`}</p>
    <div className='flex flex-col space-y-2 '>
<div  className='flex font-light items-center  justify-center text-sm '>
<ThermostatIcon size={18} className='mr-1'/>
Feels like:
<span className='  font-light ml-1'>{`${feels_like.toFixed()}°${degree}`}</span>
    </div>
    <div className='flex font-light items-center justify-center text-sm'>
<OpacityIcon size={18} className='mr-1'/>
Humidity:
<span className='  font-light ml-1'>{`${humidity.toFixed()}%`}</span>
    </div>
    < div className='flex font-light items-center justify-center text-sm'>
<CycloneIcon size={18} className='mr-1'/>

Wind Speed:
<span className=' font-light ml-1'>{`${speed.toFixed()} km/h`}</span>
    </div>
  </div>
</div>
<div className='flex items-center justify-center space-x-2 text-white text-sm py-3'>
<WbSunnyIcon/>
<p className='font-light '>
    Rise: <span className=' font-light  ml-1'>{formatToLocalTime(sunrise,timezone)}</span>
</p>
 <p className='font-light '>|</p>
<WbTwilightIcon/>
<p className='font-light '>
    Set: <span className='  font-light ml-1'>{formatToLocalTime(sunset,timezone)}</span>
</p> <p className='font-light '>|</p>
<WbSunnyIcon/>
<p className='font-light '>
    High: <span className=' font-light ml-1'>{`${temp_max.toFixed()}°${degree}`}</span>
</p> <p className='font-light '>|</p>
<WbSunnyIcon/>
<p className='font-light '>
    Low: <span className=' font-light  ml-1'>{`${temp_min.toFixed()}°${degree}`}</span>
</p>
</div>
</div>
  )
}

export default Temperature
