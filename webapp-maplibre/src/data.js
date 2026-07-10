import { Map } from 'maplibre-gl';
import { addKotaLayer, addPulauLayer } from './layers/vector';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = "300px";
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [0, 0],
  zoom: 1
});

map.on("load", () => {
  addKotaLayer(map);
  addPulauLayer(map);
})