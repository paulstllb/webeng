import { useState } from "react";

import { DataStuttgart } from "./geoStadt";
import { WeatherDataApi, fetchWeatherData } from "./ApiStadt";
import { loadAsync } from "../../App";

import Weathermod from "./weathercomponent/weathermod";


export default function WeatherShow() {
 

  let [Stadtname, setStadtname] = useState("");
  let [weatherData, setWeatherData] = useState<WeatherDataApi | null>(null);
  
  //zeigt das Weather an, welche wiederrum Weathermod aufrufen 
  return <div>

    <h1>Welches Wetter wollen sie wissen ?</h1>
    <div className="hstack flex-between">
      <div className="hstack">
        <input style={{ marginRight: "10px"}} placeholder="stuttgart" value={Stadtname} onChange={e => setStadtname(e.target.value)} />
         </div>
      <button onClick={async () => {
        let res = await loadAsync(async (setLoadingText) => {
          
          let Stadtdat = await DataStuttgart(Stadtname);
          if (Stadtdat.length == 0) {
            alert("City not found");
            return NaN
          }
          
          setLoadingText("fetching weather data...");
          let Stadtevt = Stadtdat[0];
          return await fetchWeatherData(Stadtevt.lat, Stadtevt.lon);

          
        });
        if (typeof res == "number")
          return;
        if (res instanceof Error){
          alert(res.message);
          return;
        }
        setWeatherData(res);
      }}>Suchen</button>
    </div>
    {weatherData && <Weathermod data={weatherData} />}
  </div>
}