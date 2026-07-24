import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt"
import { addBufferLayer } from "../layers/vector"
import { API_BASE_URL } from "../config"

export function storeBufferGeometry(map, event) {
    const geometry = event.features[0].geometry
    const wkt = geojsonToWKT(geometry)

    computeBuffer(map, wkt)
}

async function computeBuffer(map, wkt){
    const response = await fetch(`${API_BASE_URL}/geometry_manipulation/buffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            geometry: wkt,
            distance_m: 1000000 
        })
    })

    const result = await response.json()
    const data = wktToGeoJSON(result.wkt)

    addBufferLayer(map, data)

    // const output = document.getElementById("buffer");
    // output.textContent = JSON.stringify(data)

    return result
}