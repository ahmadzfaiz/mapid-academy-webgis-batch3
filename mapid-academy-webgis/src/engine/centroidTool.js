import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt";

export function createCentroidTool(map) {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="centroid">Hasilkan centroid</h5>
            <div class="form-group">
                <label for="polygon3">Geometri</label>
                <input class="form-control" id="polygon3" placeholder="Input geometri">
                <button type="submit" id="hitung-centroid" class="btn btn-secondary">Jalankan</button>
                <p id="hasil-centroid"></p>
            </div>
        </div>
    `;

    const button = container.querySelector("#hitung-centroid");
    button.addEventListener("click", function () {
        computeCentroidTool(map);
    });

    return container;
}

export function storeCentroidGeometry(event) {
    const geometry = event.features[0].geometry;
    const wkt = geojsonToWKT(geometry);

    const input = document.getElementById("polygon3");
    input.value = wkt;
}

export async function computeCentroidTool(map) {
    const input = document.getElementById("polygon3");
    const wkt = input.value;
    if (!wkt) return;

    const response = await fetch("http://127.0.0.1:5000/geometry_manipulation/centroid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geometry: wkt }),
    });

    const result = await response.json();
    const centroidGeoJSON = wktToGeoJSON(result.wkt);

    addCentroidToMap(map, centroidGeoJSON);

    const lng = centroidGeoJSON.coordinates[0];
    const lat = centroidGeoJSON.coordinates[1];
    const output = document.getElementById("hasil-centroid");
    output.textContent = `Centroid ditambahkan ke peta (${lng.toFixed(5)}, ${lat.toFixed(5)})`;

    return result;
}

function addCentroidToMap(map, geometry) {
    const sourceId = "centroid-result";
    const data = {
        type: "Feature",
        geometry: geometry,
        properties: {},
    };

    if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(data);
        return;
    }

    map.addSource(sourceId, { type: "geojson", data: data });
    map.addLayer({
        id: "centroid-result-point",
        type: "circle",
        source: sourceId,
        paint: {
            "circle-radius": 6,
            "circle-color": "blue",
            "circle-stroke-width": 2,
            "circle-stroke-color": "white",
        },
    });
}
