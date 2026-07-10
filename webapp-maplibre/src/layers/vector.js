import naturalEarthData from "../data/ne.geojson?url";
import areaData from "../data/area.geojson?url"

export function addKotaLayer(map){
    // Layer Vektor - Titik
    map.addSource('kota', {
        type: 'geojson',
        data: naturalEarthData
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
}

export function addPulauLayer(map){
    // Layer Vektor - Poligon
    map.addSource('pulau', {
        type: "geojson",
        data: areaData
    })

    map.addLayer({
        id: "area-pulau",
        type: "fill",
        source: "pulau",
        paint: {
        "fill-color": "orange",
        "fill-outline-color": "black"
        }
    })
}