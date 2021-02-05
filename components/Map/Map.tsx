import React, {useEffect} from 'react'

import toGeoJSON from '../../helpers/geoJson'

import { MapContainer, TileLayer, Tooltip, Popup, Marker, GeoJSON, useMap } from 'react-leaflet'
import TextPath from 'react-leaflet-textpath';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";


import L from 'leaflet';

function getLabel(poly) {
    return L.divIcon({html: poly.hex, className: `text-${poly.hexColor} text-lg bold`});
}

export default function Map({hexes, center}) {

    return (
        <MapContainer
        zoom={hexes.length > 0 ? 15 : 5}
        scrollWheelZoom={true}
        className="min-h-full">
        <TileLayer
	    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        />

        {hexes
        .sort((hexA, hexB) => hexA.hexResolution > hexB.hexResolution ? 1 : -1)
        .map(poly => (
            <>
            <GeoJSON 
                data={toGeoJSON(poly.hexPolygon)}
                style={{fillColor: poly.hexColorCode, color: poly.hexColorCode}}
                >
                <Marker position={{lat: poly.hexCenter[0], lng: poly.hexCenter[1]}}
                        icon={getLabel(poly)}
                        style={{fillColor: poly.hexColor, color: poly.hexColor, iconUrl: poly.hexColor}}
                        color={poly.hexColor}
                        />
            </GeoJSON> 

                        </>
            
            ))}
        </MapContainer>
    )
    
}
