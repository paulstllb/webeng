import { useMemo, useState } from "react";
import { TransformedWeatherDataGrouped, TransformedWeatherDataTimed, WeatherDataApi, transformWeatherData } from "../ApiStadt";
import Style from "./weathermod.module.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);


//Die "Weathermod" Komponente rendert eine Liste von Wettertagen und zeigt 
//bei Auswahl eines Tages ein entsprechendes Chart an, indem sie die Wetterdaten transformiert 
//und den aktuellen Zustand verwaltet.
export default function Weathermod(props: { data: WeatherDataApi }) {
  const { data } = props;
  const dataTransformed = useMemo(() => transformWeatherData(data), [data]);
  const [currentData, setCurrentData] = useState<TransformedWeatherDataGrouped | null>(null);
  return <div className="vstack">
    <div className={`hstack ${Style.DaysList}`}>
      {dataTransformed.map((e) => <span onClick={() => setCurrentData(e)}><WeatherDayComponent date={e.date} data={e.data} /></span>)}
    </div>
    {currentData && <WeatherDayChartComponent date={currentData.date} data={currentData.data} />}
  </div>
}


//Die "WeatherDayChartComponent" Funktion rendert ein Chart für einen bestimmten Wettertag, wobei die Temperaturwerte aus den 
//übergebenen Daten extrahiert werden. Das Chart ist responsiv
// und enthält eine Legende, einen Titel mit dem Wochentag des Datums und eine X-Achse mit Zeiteinheiten im Stundentakt.
function WeatherDayChartComponent({ date, data }: TransformedWeatherDataGrouped) {
  let tempPts = data.map((e) => [e.time, e.temperature_2m]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: DAY_MAP[date.getDay()],
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
      },
    },
  };
  
  const chartData = {
    labels: tempPts.map((e) => e[0]),
    datasets: [
      {
        cubicInterpolationMode: 'monotone',
        label: 'Weather',        
        borderColor: '#26b4a1',
        backgroundColor: '#26b4a1',
        data: tempPts,             
      },
    ],
  };


  //anzeigen des Charts mit den vorhanden Styles
  return <div className={Style.Chartee}>
    {/*@ts-ignore*/}
    
    <Line  options={options} data={chartData}  style={{position:"absolute", width:"30vw",height:"30vw"}}/>
  </div>
}




/*

Die "WeatherDayComponent" Funktion berechnet den maximalen, minimalen und durchschnittlichen Temperaturwert 
für einen bestimmten Wettertag aus den übergebenen Daten der Transformierten Wetterdaten. 
Die Temperaturwerte werden durch Reduzierung der Datenliste ermittelt und auf ganze Zahlen gerundet.
*/
function WeatherDayComponent({ date, data }: TransformedWeatherDataGrouped) {
  let tempMax = Math.round(data.reduce((prev, curr) => {
    return curr.temperature_2m > prev ? curr.temperature_2m : prev
  }, Number.NEGATIVE_INFINITY));

  let tempMin = Math.round(data.reduce((prev, curr) => {
    return curr.temperature_2m < prev ? curr.temperature_2m : prev
  }, Number.POSITIVE_INFINITY));

  let tempAvg = Math.round(data.reduce((prev, curr) => {
    return prev + curr.temperature_2m
  }, 0) / data.length);


  //anzeigen der Daten der brechneten
  return <div style={{ position: "relative" }}><div className={`vstack ${Style.DayRoot}`}>
    <span>{DAY_MAP[date.getDay()]}</span>
    <span className={Style.Date}>{`${n(date.getDate())}.${n(date.getMonth())}.${date.getFullYear()}`}</span>
    <div className={`${Style.Temps}`}>
      <span className={`${Style.Temp} ${Style.TempMin}`}>{tempMin}</span>
      <span className={`${Style.Temp} ${Style.TempAvg}`}>{tempAvg}</span>
      <span className={`${Style.Temp} ${Style.TempMax}`}>{tempMax}</span>
    </div>
  </div>
    <div className={`vstack`}>

    </div>
  </div>
}

function n(inp: number) {
  return inp < 10 ? `0${inp}` : inp.toString();
}

const DAY_MAP = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
]