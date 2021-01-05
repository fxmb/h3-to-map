export default function toGeoJSON(polygon) {
    return {
    type: "FeatureCollection",
    features: [{
        "type": "Feature",
        geometry: {
            "type": "MultiPolygon",
            "coordinates": polygon
        }
    }]
}
};