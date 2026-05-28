import { geojsonToWKT } from "@terraformer/wkt"

export function createLengthTool() {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="panjang">Hitung panjang</h5>
            <div class="form-group">
                <label for="polygon2">Geometri</label>
                <input class="form-control" id="polygon2" placeholder="Input geometri">
                <button type="submit" id="hitung-panjang" class="btn btn-secondary">Hitung</button>
                <p id="hasil-panjang"></p>
            </div>
        </div>
    `;

    const button = container.querySelector("#hitung-panjang");
    button.addEventListener("click", computeLengthTool);

    return container;
}

export function storeLengthGeometry(event) {
    const geometry = event.features[0].geometry;
    const wkt = geojsonToWKT(geometry);

    const input = document.getElementById("polygon2");
    if (input) {
        input.value = wkt;
    }
}

export async function computeLengthTool() {
    const input = document.getElementById("polygon2");
    const wkt = input?.value;
    if (!wkt) return;

    const response = await fetch("http://127.0.0.1:5000/spatial_computation/length", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ geometry: wkt }),
    });

    const result = await response.json();

    const output = document.getElementById("hasil-panjang");
    if (output) {
        output.textContent = `
            Panjang: ${result.length_m.toFixed(2)} ${result.unit}
        `;
    }
    return result;
}
