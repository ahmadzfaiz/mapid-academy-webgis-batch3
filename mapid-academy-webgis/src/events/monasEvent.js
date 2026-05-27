import monasUrl from "../data/monas.geojson?url";
import { addMonasLayer, addMonasImage } from "../layers/monasLayer";
import { addMonasPopup } from "../popups/monasPopup";

export function addMonasEvents(map){
    map.on('load', () => {
        addMonasLayer("tugu", map);
        addMonasLayer("kolam", map, monasUrl);
        addMonasLayer("mancur", map, "https://geoserver.mapid.io/layers_new/get_layer?api_key=9498e99e38f84c558f72f75af447c63b&layer_id=6a15cc319eba37cd77a151ef&project_id=6a15cc13db752242b79ed6d7");
    
        addMonasImage("spongebob", map);
    });

    map.on("click", "mancur-point", function(event){
        addMonasPopup(map, event)
    })
};
