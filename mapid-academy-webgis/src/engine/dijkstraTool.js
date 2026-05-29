import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt";
import osmHighwayUrl from "../data/osm_highway.geojson?url";

let cachedNetworkWKT = null;

export function createDijkstraTool(map) {
    const container = document.createElement("div");
    container.className = "card m-3";
    container.style.width = "12rem";
    container.innerHTML = `
        <div class="card-body">
            <h5 class="dijkstra">Rute Dijkstra</h5>
            <div class="form-group">
                <p class="small text-muted mb-2">
                    Pilih titik awal & akhir dengan tombol 📍, lalu jalankan.
                </p>
                <button type="submit" id="hitung-dijkstra" class="btn btn-secondary">Jalankan</button>
                <p id="hasil-dijkstra"></p>
            </div>
        </div>
    `;

    addNetworkLayer(map);

    const button = container.querySelector("#hitung-dijkstra");
    button.addEventListener("click", function () {
        computeDijkstraTool(map);
    });

    return container;
}

export async function computeDijkstraTool(map) {
    const startWKT = document.getElementById("point1").value;
    const endWKT = document.getElementById("point2").value;

    if (!startWKT || !endWKT) {
        setStatus("Pilih dua titik dahulu");
        return;
    }

    setStatus("Memuat jaringan jalan…");
    const networkWKT = await loadNetworkWKT();

    setStatus("Menghitung rute…");
    const response = await fetch("http://127.0.0.1:5000/network_analysis/dijkstra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            start: startWKT,
            end: endWKT,
            network: networkWKT,
        }),
    });

    const result = await response.json();

    const routeGeoJSON = wktToGeoJSON(result.wkt);
    addRouteToMap(map, routeGeoJSON);
    setStatus("Rute Dijkstra ditambahkan ke peta");

    return result;
}

async function loadNetworkWKT() {
    if (cachedNetworkWKT) return cachedNetworkWKT;

    const response = await fetch(osmHighwayUrl);
    const data = await response.json();

    const allCoordinates = data.features.map(function (feature) {
        return feature.geometry.coordinates;
    });

    const multiLineString = {
        type: "MultiLineString",
        coordinates: allCoordinates,
    };

    cachedNetworkWKT = geojsonToWKT(multiLineString);
    return cachedNetworkWKT;
}

function addNetworkLayer(map) {
    map.on("load", function () {
        map.addSource("osm-highway", {
            type: "geojson",
            data: osmHighwayUrl,
        });

        map.addLayer({
            id: "osm-highway-line",
            type: "line",
            source: "osm-highway",
            paint: {
                "line-color": "#888",
                "line-width": 1,
                "line-opacity": 0.6,
            },
        });
    });
}

function addRouteToMap(map, geometry) {
    const sourceId = "dijkstra-route";
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
        id: "dijkstra-route-line",
        type: "line",
        source: sourceId,
        paint: {
            "line-color": "blue",
            "line-width": 4,
        },
    });
}

function setStatus(text) {
    const output = document.getElementById("hasil-dijkstra");
    output.textContent = text;
}
