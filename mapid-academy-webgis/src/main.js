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
    style: 'https://basemap.mapid.io/styles/basic/style.json?key=6a15c3949b6fba880a625159',
    center: [106.827, -6.175],
    zoom: 14
});
