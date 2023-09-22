


const apiKey = process.env.REACT_APP_WEATHER_API;
const BaseUrl = "https://api.openweathermap.org/data/2.5";




const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BaseUrl + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: apiKey });
  console.log(url);
  return fetch(url)
    .then((res) => res.json())

    .then((data) => data);
};



const FormatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    name,
    sys: { sunrise, sunset, country },
    dt,
    weather,
  } = data;

  const { main, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    name,
    sunrise,
    sunset,
    country,
    dt,
    main,
    icon,
  };
};

const formatForecastWeather = (data) => {

 
  let { city,list } = data;
  let{timezone}=city;


  list = list.slice(0,5).map((d) => {
    return {
      title: formatToLocalTime(d.dt,timezone),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, list };

};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(FormatCurrentWeather);
  const { lat,lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,lon,
    units: searchParams.units,
  }).then(formatForecastWeather);
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// const formatToLocalTime = (
//   secs,
//   zone,
//   format = "cccc, dd LLL yyyy ' | Local Time: 'hh:mm a",

// ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)



const  formatToLocalTimeTimestamp=(timestamp, timeZoneOffset)=> {
 
  const timestampInMillis = (timestamp-19800) * 1000;


  const date = new Date(timestampInMillis + timeZoneOffset * 1000);

  const options = {
    weekday:"long",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedDateTime = date.toLocaleDateString('en-US', options);

  return formattedDateTime;
}

const  formatToLocalTime=(timestamp, timeZoneOffset)=> {
 
  const timestampInMillis = (timestamp-19800) * 1000;


 const date = new Date(timestampInMillis + timeZoneOffset * 1000);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedDateTime = date.toLocaleTimeString('en-US', options);

  return formattedDateTime;
}



const IconfromUrl=(code)=>`https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export{formatToLocalTimeTimestamp,formatToLocalTime, IconfromUrl};

