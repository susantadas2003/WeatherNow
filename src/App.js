import "./App.css";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import TimeStamp from "./Components/TimeStamp";
import Temperature from "./Components/Temperature";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./Components/WeatherData";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "kolkata" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [degree, setDegree] = useState("C");

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";

      toast.info("Fetching weather for " + message);
      const data = await getFormattedWeatherData({ ...query, units }).then(

        (data) => {
          
        console.log(data);
          toast.success(
            `Successfully fetched weather for ${data.name},${data.country}`
          );
          setWeather(data);
        }
      );
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return " from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 10 : 50;
    const max_threshold = units === "metric" ? 30 : 86;

    if (weather.temp >= max_threshold) return "from-yellow-700 to-orange-700";
    else if (weather.temp < max_threshold && weather.temp >= threshold)
      return "from-cyan-700 to-blue-700";
    else if (weather.temp < threshold) return " from-gray-700  to-white-700 ";
  };

  return (
    <div
      className={`mx-auto  mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}
    >
      <Header setQuery={setQuery} />
      <SearchBar setQuery={setQuery} units={units} setUnits={setUnits} setDegree={setDegree}/>

      {weather && (
        <div>
          {" "}
          <TimeStamp weather={weather} />
          <Temperature weather={weather}  degree={degree}/>
          <Forecast
            title="hourly forecast"
            items={weather.list}
            degree={degree}
          />
        </div>
      )}

      {/* <Forecast title="daily forecast"/> */}

      <ToastContainer
        hideProgressBar={true}
        autoClose={1000}
        theme="colored"
        newestOnTop={true}
      />
    </div>
  );
}

export default App;

// "name": "https://susantadas2003.github.io/WeatherNews",

// max-w-screen-md
