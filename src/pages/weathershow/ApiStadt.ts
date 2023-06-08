/*
Die "fetchWeatherData" Funktion ruft asynchron Wetterdaten von einer API basierend auf den übergebenen 
Längen- und Breitengradkoordinaten ab. Die Funktion baut die URL für die API-Anfrage auf und verwendet die fetch-Funktion, 
um die Daten abzurufen. 
Die erhaltenen Daten werden als JSON analysiert und als "WeatherDataApi"-Objekt zurückgegeben.
*/
export async function fetchWeatherData(latidude: string, longitude: string) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latidude}&longitude=${longitude}&hourly=temperature_2m,rain,snowfall,weathercode`
    let res = await fetch(url);
    let json: WeatherDataApi = await res.json();
    return json;
}


 
//Die Funktion "transformWeatherData" nimmt Wetterdaten im Format "WeatherDataApi" entgegen und
//transformiert sie in eine gruppierte Form, die "TransformedWeatherDataGrouped[]" zurückgibt.
export function transformWeatherData(data: WeatherDataApi): TransformedWeatherDataGrouped[] {
     /*
    Der Code durchläuft zunächst die Stundeninformationen der übergebenen Wetterdaten und stellt sicher, 
    dass sie alle die gleiche Länge haben. Anschließend werden die Daten in ein Array von Objekten transformiert, 
    wobei jedes Objekt die Werte für einen bestimmten Zeitpunkt enthält.
    */
    let hourly = data.hourly;
    let keys = [];
    for (let key in hourly) {
        keys.push(key);
    }
    let len = -1;
    for (let el of Object.values(hourly)) {
        let elt = el as any[];
        if (len == -1) {
            len = elt.length
        } else {
            if (len != elt.length) throw new Error("lenght not equal");
        }
    }
    if (len == -1) len = 0;
    let result: TransformedWeatherDataTimed<string>[] = [];
    for (let i = 0; i < len; i++) {//@ts-ignore
        let obj: TransformedWeatherDataTimed<string> = {};//@ts-ignore
        for (let key in hourly) obj[key] = hourly[key][i];
        result.push(obj);
    }
    let result_changed = result.map(d => {
        let date = new Date(d.time);
        return { time: date, temperature_2m: d.temperature_2m, rain: d.rain, snowfall: d.snowfall, weathercode: d.weathercode }
    })
    let end: TransformedWeatherDataTimed<Date>[][] = [];
    /*
    Die transformierten Daten werden dann weiter verarbeitet, um sie nach Tagen zu gruppieren. 
    Jeder Tag wird zu einem Objekt vom Typ "TransformedWeatherDataTimed<Date>[]", wobei das Datum auf Mitternacht gesetzt wird. 
    Diese gruppierten Tagesdaten werden in einem Array gesammelt und schließlich zurückgegeben.
    */
    let heute: TransformedWeatherDataTimed<Date>[] = [];
    let heute_date: Date = result_changed[0].time;
    for (let el of result_changed) {
        if (el.time.getDate() != heute_date.getDate()) {
            end.push(heute);
            heute = [];
            heute_date = el.time;
        }
        heute.push(el);
    }
    end.push(heute);

    
    let grouped_days = end.map(d => {
        let date = d[0].time;
        date.setHours(0, 0, 0, 0);
        return { date: date, data: d }
    })
    

    //Zusammenfassend fasst die Funktion die erhaltenen Wetterdaten 
    //zusammen und ordnet sie nach Tagen, um eine übersichtliche Darstellung zu ermöglichen.
    return grouped_days;
}


interface Hourly {
    time: string[];
    temperature_2m: number[];
    rain: number[];
    snowfall: number[];
    weathercode: number[];
}

interface HourlyUnits {
    time: string;
    temperature_2m: string;
    rain: string;
    snowfall: string;
    weathercode: string;
}


export interface TransformedWeatherDataGrouped{
    date: Date, data: TransformedWeatherDataTimed<Date>[]
}

export interface WeatherDataApi {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: HourlyUnits;
    hourly: Hourly;
}

export interface TransformedWeatherDataTimed<T> {
    time: T;
    temperature_2m: number;
    rain: number;
    snowfall: number;
    weathercode: number;
}











