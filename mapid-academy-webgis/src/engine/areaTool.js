import { geojsonToWKT } from "@terraformer/wkt"

export function createAreaTool() {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="luas">Hitung luas</h5>
            <div class="form-group">
                <label for="polygon1">Polygon</label>
                <input class="form-control" id="polygon1" placeholder="Geometri polygon">
                <button type="submit" id="hitung-luas" class="btn btn-secondary">Hitung</button>
                <p id="hasil-luas"></p>
            </div>
        </div>
    `;

    const button = container.querySelector("#hitung-luas");
    button.addEventListener("click", computeAreaTool);

    return container;
}

export function storeAreaGeometry(event) {
    const geometry = event.features[0].geometry;
    const wkt = geojsonToWKT(geometry);

    const input = document.getElementById("polygon1");
    if (input) {
        input.value = wkt;
    }
}

export async function computeAreaTool() {
    const input = document.getElementById("polygon1");
    const wkt = input?.value;
    if (!wkt) return;

    const response = await fetch("http://127.0.0.1:5000/spatial_computation/area", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ geometry: wkt }),
    });

    const result = await response.json();

    const output = document.getElementById("hasil-luas");
    if (output) {
        output.textContent = `
            Luas: ${result.area_ha.toFixed(2)} ${result.unit}
        `;
    }
    return result;
}
