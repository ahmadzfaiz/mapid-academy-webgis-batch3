let pickMode = null;
const pickedCoords = { point1: null, point2: null };

export function createDistanceTool(map) {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="distance">Hitung jarak</h5>
            <div class="form-group">
                <label for="point1">Titik 1</label>
                <input class="form-control" id="point1" placeholder="POINT(lng lat)">
                <label for="point2" class="mt-2">Titik 2</label>
                <input class="form-control" id="point2" placeholder="POINT(lng lat)">
                <button type="submit" id="hitung-jarak" class="btn btn-secondary mt-2">Jalankan</button>
                <p id="hasil-jarak"></p>
            </div>
        </div>
    `;

    const button = container.querySelector("#hitung-jarak");
    button.addEventListener("click", computeDistanceTool);

    return container;
}

export function setupLocationPickers(map) {
    document.body.addEventListener("click", (e) => {
        if (e.target.id === "first-location") {
            pickMode = "point1";
            setStatus("Klik peta untuk titik 1");
        } else if (e.target.id === "second-location") {
            pickMode = "point2";
            setStatus("Klik peta untuk titik 2");
        }
    });

    map.on("click", (event) => {
        if (!pickMode) return;
        const { lng, lat } = event.lngLat;
        const wkt = `POINT(${lng} ${lat})`;

        const input = document.getElementById(pickMode);
        if (input) input.value = wkt;

        pickedCoords[pickMode] = [lng, lat];
        addPointToMap(map, pickMode, [lng, lat]);
        updateLineLayer(map);
        setStatus("");
        pickMode = null;
    });
}

export async function computeDistanceTool() {
    const wkt1 = document.getElementById("point1")?.value;
    const wkt2 = document.getElementById("point2")?.value;
    if (!wkt1 || !wkt2) return;

    const response = await fetch("http://127.0.0.1:5000/spatial_computation/distance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geometry_1: wkt1, geometry_2: wkt2 }),
    });

    const result = await response.json();

    const output = document.getElementById("hasil-jarak");
    if (output) {
        output.textContent = `Jarak: ${result.distance_m.toFixed(2)} ${result.unit}`;
    }
    return result;
}

function addPointToMap(map, slot, coords) {
    const sourceId = `distance-${slot}`;
    const color = slot === "point1" ? "green" : "orange";
    const data = {
        type: "Feature",
        geometry: { type: "Point", coordinates: coords },
        properties: {},
    };

    if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(data);
        return;
    }

    map.addSource(sourceId, { type: "geojson", data });
    map.addLayer({
        id: `${sourceId}-point`,
        type: "circle",
        source: sourceId,
        paint: {
            "circle-radius": 7,
            "circle-color": color,
            "circle-stroke-width": 2,
            "circle-stroke-color": "white",
        },
    });
}

function updateLineLayer(map) {
    if (!pickedCoords.point1 || !pickedCoords.point2) return;

    const sourceId = "distance-line";
    const data = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: [pickedCoords.point1, pickedCoords.point2],
        },
        properties: {},
    };

    if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(data);
        return;
    }

    map.addSource(sourceId, { type: "geojson", data });
    map.addLayer({
        id: `${sourceId}-line`,
        type: "line",
        source: sourceId,
        paint: {
            "line-color": "red",
            "line-width": 2,
            "line-dasharray": [2, 2],
        },
    });
}

function setStatus(text) {
    const output = document.getElementById("hasil-jarak");
    if (output) output.textContent = text;
}
