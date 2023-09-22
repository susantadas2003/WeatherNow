import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar({setQuery,units,setUnits,setDegree}) {

  const[city,setCity]=useState('');
const handleSearchClick =()=>{
  if(city!=='')setQuery({q:city})
}

const handleKeyPressed=(e)=>{

  if(e.keyCode===13){
    setQuery({q:city});
    e.currentTarget.blur();
  }
}
const handleLocationClick=() => {
  if (navigator.geolocation) {

    toast.info("Fetching user's Location")
  navigator.geolocation.getCurrentPosition((position) =>
  {

    toast.success("Location fetched");
  let lat =position.coords.latitude;
  let lon =position.coords.longitude;

 
  setQuery({
  lat,
  lon,
  });
});
  }
}

const handleUnitsClick=(e)=>{

  const SelectedUnit =e.currentTarget.name;

  if(units!==SelectedUnit) setUnits(SelectedUnit)

  if(SelectedUnit==="imperial")setDegree("F")

  if(SelectedUnit=="metric")setDegree("C")
}
  
  return (
    < div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row justify-center items-center w-3/4 space-x-4'>
      <input onKeyDown={handleKeyPressed} value={city} onChange={(e)=>setCity(e.currentTarget.value)}className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize'  type="text"   placeholder='Enter city'/> 
      <SearchIcon onClick={handleSearchClick } size={25}    className='text-white cursor-pointer transition ease-out hover:scale-125'/>
     
      <LocationOnIcon onClick={handleLocationClick}  size={25}    className='text-white cursor-pointer transition ease-out hover:scale-125'/>
      </div>
      
  <div className='flex items-center flex-row justify-center ml-6' ></div>
  <button name="metric" className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitsClick} >°C  </button>
  <p className='text-xl text-white  mx-1 my-1'>| </p>
  <button name="imperial" className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitsClick} >°F</button>
  </div>
  )
}

export default SearchBar
