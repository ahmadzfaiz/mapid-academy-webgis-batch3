import { Map } from 'maplibre-gl';

export function createMonasMap() {
    const mapElement = document.createElement('div');
    mapElement.id = "map";
    mapElement.style.height = "300px"
    document.body.appendChild(mapElement);

    return new Map({
        container: 'map',
        style: 'https://basemap.mapid.io/styles/basic/style.json?key=6a15c3949b6fba880a625159',
        center: [106.827, -6.175],
        zoom: 14
    });
};