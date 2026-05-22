// const mapidElement = document.createElement('div');

// mapidElement.textContent = "Hello from MAPID Academy!";

// document.body.appendChild(mapidElement);

// MapLibre components
import { Map } from 'maplibre-gl';

const mapElement = document.createElement('div');
mapElement.id = "map";
mapElement.style.height = "300px"
document.body.appendChild(mapElement);

const map = new Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/globe.json',
    center: [0, 0],
    zoom: 1
});
