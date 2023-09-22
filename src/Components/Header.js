import React from 'react'


function Header({setQuery}) {

    const cities=[

        {
            id:1,
            title:'Kolkata'
        },
        {
            id:2,
            title:'Delhi'
        },
        {
            id:3,
            title:'Paris'
        },
        {
            id:4,
            title:'Mumbai'
        },
        {
            id:5,
            title:'London'
        },
        {
            id:6,
            title:'Bangalore'
        },
        {
            id:7,
            title:'Siberia'
        }
    ]
  
  return (
   
<div>

    <div className='flex text-white text-3xl font-medium py-3'>
        <img  className="flex row-items mr-2"src="  favicon-32x32.png" alt="" />
        <button className='flex flex-row-items'>WeatherNow</button>
        </div>
        <div className='flex items-center justify-around my-6'>
     {cities.map((city) =>(

        <button onClick={()=>setQuery({q:city.title})} key={city.id} className='text-white text-lg font-medium'>{city.title}</button>
 
     )
     )
      }
       </div>    
       </div>
)
    }
export default Header
