import 'maplibre-gl/dist/maplibre-gl.css';
import { Popup } from "maplibre-gl";

export function addMonasPopup(map, event){
    const feature = event.features[0];
    const properties = feature.properties;
    
    return new Popup()
        .setLngLat(event.lngLat)
        .setHTML(`<div>${properties.nama || properties.name}</div>`)
        .addTo(map);
}

const popup = new Popup()

export function showMonasPopup(map, event) {
    const feature = event.features[0];
    const properties = feature.properties;

    return popup
        .setLngLat(event.lngLat)
        .setHTML(`<div>${properties.nama || properties.name}</div>`)
        .addTo(map);
}

export function hideMonasPopup(map) {
    popup.remove();
}