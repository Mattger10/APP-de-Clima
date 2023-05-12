import { useEffect, useState, useRef } from "react";
import { getCountries } from "./services/countries";
import { getCityWeather } from "./services/weather";
import { registerLocale } from "i18n-iso-countries"; //para traducir a español
import es from "i18n-iso-countries/langs/es.json";
import getWeatherDescription from "./components/traduccion";
import styles from "./App.module.css";

registerLocale(es);

const weatherImages = {
  "clear sky":
    "https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/App%20clima%2Fsol.png?alt=media&token=87a71030-2214-4871-bf5b-9d202b7faa26", 

  "cloudy": "https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/App%20clima%2Fnublado.png?alt=media&token=7acca637-dc3e-4020-9e02-41cd2cf81855",

  "broken clouds": "https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/App%20clima%2Fparcialmente%20nublado.png?alt=media&token=235d2efa-eb2d-4a6b-90ab-323c73eda12c",

  "moderate rain": "https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/App%20clima%2Flluvia%20moderada.png?alt=media&token=6a2b6918-12fc-4a53-993b-6866b4fd22c9",


  
  
};

const App = () => {
  const [setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const searchButtonRef = useRef(null);
  const [weatherImage, setWeatherImage] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedCountries = await getCountries();
      const sortedCountries = fetchedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
    })();
  }, [setCountries]);

  const searchWeather = async () => {
    if (inputValue) {
      try {
        const weatherData = await getCityWeather(inputValue);
        setWeather(weatherData);
        setSelectedCity(inputValue);
        setError("");

        const currentWeather = weatherData.weather[0].description;
        const imageUrl = weatherImages[currentWeather];
        setWeatherImage(imageUrl);
      } catch (error) {
        setWeather(null);
        setError(
          `No se pudo encontrar la ciudad "${inputValue}...".`
        );
      }
    } else {
      setError("Por favor, ingresa el nombre de una ciudad.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchWeather();
      searchButtonRef.current.click();
    }
  };

  return (
    <div className={styles.fondo}>
      <div className={styles.group}>
        <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe el nombre de la ciudad"
          className={styles.input}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {weather ? (
        ""
      ) : (
        <div>
          <img
            className={styles.logo}
            src="https://firebasestorage.googleapis.com/v0/b/salvandohuellas.appspot.com/o/App%20clima%2FLogo%20MG%20azul.png?alt=media&token=3f0d6576-8e93-4a3a-b868-7131c47cd3b8"
            alt=""
          />
          <p className={styles.App}>App del clima</p>
        </div>
      )}

      {weather && (
        <div className={styles.weatherInfo}>
          <h1>{selectedCity}</h1>
          <h2>{Math.floor(weather.main.temp)}°</h2>
          <p className={styles.clima}>{getWeatherDescription(weather.weather[0].description)}</p>
          <div className={styles.envuelve}>
            <div className={styles.minMax}>
              <p className={styles.label}>Min: </p>
              <p className={styles.label}>Max:</p>
              <p className={styles.label}>Humedad:</p>
            </div>
            <div className={styles.minMax2}>
              <p className={styles.labelP}>
                {Math.floor(weather.main.temp_min)}°
              </p>
              <p className={styles.labelP}>
                {Math.floor(weather.main.temp_max)}°
              </p>
              <p className={styles.labelP}>{weather.main.humidity}%</p>
            </div>
          </div>
          <img
            className={styles.imgIco}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
           <div
            className={styles.cuadro}
          /> 
        </div>
      )}
    </div>
  );
};

export default App;
