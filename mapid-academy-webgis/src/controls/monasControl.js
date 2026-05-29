import { 
    NavigationControl, 
    ScaleControl,
    AttributionControl,
    FullscreenControl 
} from "maplibre-gl"
import { JakartaLogoControl } from "./customLogoControl";
import { LocationButtonControl } from "./customButtonControl";

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
    map.addControl(new LocationButtonControl("first-location", "btn-outline-success"), "top-left");
    map.addControl(new LocationButtonControl("second-location", "btn-outline-warning"), "top-left");
};