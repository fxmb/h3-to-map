export default function toGeoJSON(polygon) {
    return {
    type: "FeatureCollection",
    features: [{
        "type": "Feature",
        "properties":{
            "name":"TRON-02",
            "serial":"TRON002",
            "color":"green",
        },
        geometry: {
            "type": "MultiPolygon",
            "coordinates": polygon
        }
    }]
}
};