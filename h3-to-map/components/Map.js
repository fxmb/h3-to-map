import React, {useEffect} from 'react'

import toGeoJSON from '../helpers/geoJson'

import { MapContainer, TileLayer, Tooltip, Popup, Polygon, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import customMarker from '../helpers/customMarker'
export default function Map({hexes , h3Points, polygon}) {

    console.log(polygon)

    return (
        <MapContainer
        style={{ height: "100vh" }} 

        center={{ lat:	h3Points.length > 0 ? h3Points[h3Points.length - 1][0] : 51.312801
                , lng: h3Points.length > 0 ? h3Points[h3Points.length - 1][1] : 9.481544}}
        zoom={h3Points.length > 0 ? 13 : 5}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hexes.map(poly => (<GeoJSON data={toGeoJSON(poly.hexPolygon)}>
        <Tooltip sticky>{`Lat ${poly.hexCenter[0]}
                    Lng ${poly.hexCenter[1]}
                    Hex ${poly.hex}`}</Tooltip>
                <Popup>
                    {`Lat ${poly.hexCenter[0]}
                    Lng ${poly.hexCenter[1]}
                    Hex ${poly.hex}`}
                </Popup>
            </GeoJSON> ))}
      </MapContainer>
    )
    
}