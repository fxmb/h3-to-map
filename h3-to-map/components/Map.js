import React, {useEffect} from 'react'

import toGeoJSON from '../helpers/geoJson'

import { MapContainer, TileLayer, Tooltip, Popup, Marker, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";


import L from 'leaflet';

function getLabel(hexName) {
    return L.divIcon({html: hexName, className: "text-blue-500 bold"});
}
import customMarker from '../helpers/customMarker'
export default function Map({hexes, center}) {

    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

    return (
        <MapContainer
        center={center}
        zoom={hexes.length > 0 ? 15 : 5}
        scrollWheelZoom={true}
        className="min-h-full">
        <TileLayer
	    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        />

        {hexes.map(poly => (<GeoJSON data={toGeoJSON(poly.hexPolygon)}>
            <Marker position={{lat: poly.hexCenter[0], lng: poly.hexCenter[1]}}
                    icon={getLabel(poly.hex)}
                    className="text-blue-500 bg-blue-300"
                    />
            <Tooltip sticky>{`Lat ${poly.hexCenter[0]}
                    Lng ${poly.hexCenter[1]}
                    Hex ${poly.hex}`}</Tooltip>
                <Popup>
                    {`Lat ${poly.hexCenter[0]} <br>
                    Lng ${poly.hexCenter[1]}
                    Hex ${poly.hex}`}
                </Popup>
            </GeoJSON> ))}
      </MapContainer>
    )
    
}