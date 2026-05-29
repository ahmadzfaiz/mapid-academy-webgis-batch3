import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt";

export function createBufferTool(map) {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="buffer">Hasilkan buffer</h5>
            <div class="form-group">
                <label for="polygon4">Geometri</label>
                <input class="form-control" id="polygon4" placeholder="Input geometri">
                <label for="buffer-distance" class="mt-2">Jarak (m)</label>
                <input class="form-control" id="buffer-distance" type="number" value="100">
                <button type="submit" id="hitung-buffer" class="btn btn-secondary mt-2">Jalankan</button>
                <p id="hasil-buffer"></p>
            </div>
        </div>
    `;

    const button = container.querySelector("#hitung-buffer");
    button.addEventListener("click", function () {
        computeBufferTool(map);
    });

    return container;
}

export function storeBufferGeometry(event) {
    const geometry = event.features[0].geometry;
    const wkt = geojsonToWKT(geometry);

    const input = document.getElementById("polygon4");
    input.value = wkt;
}

export async function computeBufferTool(map) {
    const input = document.getElementById("polygon4");
    const distanceInput = document.getElementById("buffer-distance");
    const wkt = input.value;
    const distance_m = Number(distanceInput.value);
    if (!wkt || !distance_m) return;

    const response = await fetch("http://127.0.0.1:5000/geometry_manipulation/buffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geometry: wkt, distance_m: distance_m }),
    });

    const result = await response.json();
    const bufferGeoJSON = wktToGeoJSON(result.wkt);

    addBufferToMap(map, bufferGeoJSON);

    const output = document.getElementById("hasil-buffer");
    output.textContent = `Buffer ${result.distance_m} m ditambahkan ke peta`;

    return result;
}

function addBufferToMap(map, geometry) {
    const sourceId = "buffer-result";
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
        id: "buffer-result-fill",
        type: "fill",
        source: sourceId,
        paint: {
            "fill-color": "purple",
            "fill-opacity": 0.3,
            "fill-outline-color": "purple",
        },
    });
}
