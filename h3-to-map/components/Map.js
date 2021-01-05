import React, {useEffect} from 'react'

import toGeoJSON from '../helpers/geoJson'

import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";


export default function Map({zoom , h3Points, polygon}) {

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
        {h3Points.map(h3Point => (
            <Marker position={h3Point}>
                <Popup>
                    {`Lat ${h3Point[0]} Lng ${h3Point[1]}`}
                </Popup>
            </Marker>
        ))}
        {polygon.map(poly => <GeoJSON data={toGeoJSON(poly)} /> )}
      </MapContainer>
    )
    
}