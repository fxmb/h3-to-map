import L from 'leaflet';

const customMarker = new L.Icon({
    iconUrl: require('../static/customPin.svg'),
    iconRetinaUrl: require('../static/customPin.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 40),
    backgroundColor: null,
    className: 'leaflet-div-icon'
});

export default customMarker;