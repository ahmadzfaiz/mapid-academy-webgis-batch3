import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { addKotaLayer, addPulauLayer } from '../../layers/vector';
import { addAttribution } from '../../controls/basicControls';
import { LogoHondaControl } from '../../controls/customLogoControls';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = "300px";
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://basemap.mapid.io/styles/dark/style.json?key=6a15c3949b6fba880a625159',
  center: [106.83, -6.19],
  zoom: 13,
  attributionControl: false
});

map.on("load", () => {
  addKotaLayer(map);
  addPulauLayer(map);
});

addAttribution(map, "Natural Earth");
map.addControl(new LogoHondaControl(), "top-left")