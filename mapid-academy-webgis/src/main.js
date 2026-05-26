// const mapidElement = document.createElement('div');

// mapidElement.textContent = "Hello from MAPID Academy!";

// document.body.appendChild(mapidElement);

// MapLibre components
import { Map } from 'maplibre-gl';
import monasUrl from "./data/monas.geojson?url";

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

map.on('load', () => {
    // Define geojson data
    const geojsonData = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [106.827, -6.175]
        },
        "properties": {
            "name": "Taman Monumen Nasional"
        }
    };

    // Add geojson source
    map.addSource("monas", {
        type: "geojson",
        data: "https://geoserver.mapid.io/layers_new/get_layer?api_key=9498e99e38f84c558f72f75af447c63b&layer_id=6a15cc319eba37cd77a151ef&project_id=6a15cc13db752242b79ed6d7"
    });

    // Add layer visual
    map.addLayer({
        id: "monas-point",
        type: "circle",
        source: "monas",
        paint: {
            "circle-radius": 8,
            "circle-color": "red",
            "circle-stroke-width": 2,
            "circle-stroke-color": "white"
        }
    });

});
