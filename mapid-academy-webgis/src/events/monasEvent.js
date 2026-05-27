import monasUrl from "../data/monas.geojson?url";
import { addMonasLayer, addMonasImage } from "../layers/monasLayer";
import { addMonasPopup, showMonasPopup, hideMonasPopup } from "../popups/monasPopup";

export function addMonasEvents(map){
    map.on('load', () => {
        addMonasLayer("tugu", map);
        addMonasLayer("kolam", map, "Data A", monasUrl);
        addMonasLayer("mancur", map, "Data B", "https://geoserver.mapid.io/layers_new/get_layer?api_key=9498e99e38f84c558f72f75af447c63b&layer_id=6a15cc319eba37cd77a151ef&project_id=6a15cc13db752242b79ed6d7");
    
        addMonasImage("spongebob", map);
    });

    map.on("mousemove", "mancur-point", function(event){
        showMonasPopup(map, event);
    });
    
    map.on("mouseleave", "mancur-point", function(event){
        hideMonasPopup(map);
    });

    map.on("click", "kolam-point", function(event){
        addMonasPopup(map, event);
    });

    map.on("click", "tugu-point", function(event){
        addMonasPopup(map, event);
    });
};
