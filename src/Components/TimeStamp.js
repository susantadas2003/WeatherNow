import React from 'react'
import { formatToLocalTimeTimestamp } from './WeatherData'

function TimeStamp({weather:{dt,timezone,name,country}}) {
  return (
    <div>
    <div className='flex items-center justify-center my-6 '>
      <p className='text-white text-xl font-extralight'> {formatToLocalTimeTimestamp(dt,timezone)}</p>
    </div>
    <div className='justify-center items-center flex my-3'>
        <p className='text-white text-3xl font-medium  '>{`${name},${country} `}</p>
    </div>
    </div>
  )
}

export default TimeStamp
