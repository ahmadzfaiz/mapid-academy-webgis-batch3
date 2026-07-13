import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { addKotaLayer, addPulauLayer } from '../../layers/vector';
import { addAttribution } from '../../controls/basicControls';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = "300px";
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [0, 0],
  zoom: 1,
  attributionControl: false
});

map.on("load", () => {
  addKotaLayer(map);
  addPulauLayer(map);
});

addAttribution(map, "Natural Earth");