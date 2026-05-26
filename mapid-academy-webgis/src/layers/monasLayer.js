// Define geojson data
const geojsonData = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [106.827, -6.175]
    },
    "properties": {
        "name": "Taman Monumen Nasional"
    }
};

export function addMonasLayer(id, map, data=geojsonData){
    // Add geojson source
    map.addSource(id, {
        type: "geojson",
        data: data
    });

    // Add layer visual
    map.addLayer({
        id: `${id}-point`,
        type: "circle",
        source: id,
        paint: {
            "circle-radius": 8,
            "circle-color": "red",
            "circle-stroke-width": 2,
            "circle-stroke-color": "white"
        }
    });
};

const spongebobImage = 'https://static.wikia.nocookie.net/cartoons/images/e/ed/Profile_-_SpongeBob_SquarePants.png'

export function addMonasImage(id, map, data=spongebobImage){
    // Add georeferenced image
    map.addSource(`${id}-image-src`, {
        type: 'image',
        url: data,
        coordinates: [
            [106.8245, -6.1725], // top-left
            [106.8295, -6.1725], // top-right
            [106.8295, -6.1775], // bottom-right
            [106.8245, -6.1775]  // bottom-left
        ]
    });

    // Add image layer visual
    map.addLayer({
        id: `${id}}-image`,
        type: 'raster',
        source: `${id}-image-src`,
        paint: {
            'raster-opacity': 0.8
        }
    });
};