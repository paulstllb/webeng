/*
Die Funktion "DataStuttgart" ruft asynchron Daten für eine Stadt ab, indem sie den Namen der Stadt verwendet 
und eine API-Anfrage an die "https://geocode.maps.co/search" URL sendet. Die Funktion gibt ein JSON-Array vom Typ "CityDataResponse[]" zurück, 
das Informationen wie den Ort, die Koordinaten und andere Details über die Stadt enthält.
*/
export async function DataStuttgart(cityName: string){
    let res = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(cityName)}`);
    let json: CityDataResponse[] = await res.json();
    return json;
}


export interface CityDataResponse {
    place_id:     number;
    osm_id:       number;
    boundingbox:  string[];
    lat:          string;
    lon:          string;
    display_name: string;
    class:        string;
    type:         string;
    importance:   number;
}
