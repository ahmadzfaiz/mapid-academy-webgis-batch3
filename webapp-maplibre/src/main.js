import { Map } from 'maplibre-gl';
import naturalEarthData from "./data/ne.geojson?url";

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = "300px";
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [106.83, -6.19],
  zoom: 11
});

// const data = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "name": "Jakarta"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           106.3343232,
//           -6.1416728
//         ]
//       }
//     }
//   ]
// }


map.on("load", () => {

  map.addSource('kota', {
    type: 'geojson',
    data: "https://geoserver.mapid.io/layers_new/get_layer?api_key=9498e99e38f84c558f72f75af447c63b&layer_id=6a15cc319eba37cd77a151ef&project_id=6a15cc13db752242b79ed6d7"
  });
  
  map.addLayer({
    id: "titik-kota",
    type: "circle",
    source: "kota",
    paint: {
      "circle-radius": 5,
      "circle-color": "blue",
      "circle-stroke-width": 1,
      "circle-stroke-color": "black"
    }
  })

})