import 'maplibre-gl/dist/maplibre-gl.css';
import { Popup } from "maplibre-gl";

export function addMonasPopup(map, event){
    const feature = event.features[0];
    const properties = feature.properties;
    
    return new Popup()
        .setLngLat(event.lngLat)
        .setHTML(`<div>${properties.nama}</div>`)
        .addTo(map);
}