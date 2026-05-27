import { 
    NavigationControl, 
    ScaleControl,
    AttributionControl,
    FullscreenControl 
} from "maplibre-gl"
import { JakartaLogoControl } from "./customLogoControl";

export function addMonasControl(map){
    map.addControl(new NavigationControl());
    map.addControl(new ScaleControl({
        unit: "metric",
        maxWidth: 200
    }));
    map.addControl(new AttributionControl({
        compact: true,
        customAttribution: "MAPID Academy"
    }));
    map.addControl(new FullscreenControl());
    map.addControl(new JakartaLogoControl(), "top-left");
};