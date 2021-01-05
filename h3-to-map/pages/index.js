import {useState, useEffect} from 'react'

const h3 = require("h3-js");

import dynamic from "next/dynamic";

import HexList from '../components/HexList'

import fetchHexInfo from '../helpers/h3API'

export default function Home() {


  const [currentHex, setCurrentHex] = useState("");
  const [currentHexList, setCurrentHexList] = useState([]);
  const [isValidHex, setIsValidHex] = useState(true);
  const [mapCenter, setMapCenter] = useState({lat: 51.312801, lng: 9.481544});
  const [poly, setPoly] = useState([]);
  const [totalHexes, setTotalHexes] = useState([]);
  


  const handleKeyDown = async (event) => {
    if(event.key === 'Enter') {

      if( h3.h3IsValid(currentHex) ){

      setIsValidHex(true)
      
      const hexInfo = await fetchHexInfo(currentHex)
      setTotalHexes(totalHexes => [...totalHexes, hexInfo])

      const hexCoordinates = await getHexCenterCoordinates(currentHex)
      const hexOutline = await getHexOutline(currentHex)

      setCurrentHexList(currentHexList => [...currentHexList, hexCoordinates])
      setPoly(poly => [...poly, hexOutline])
      console.log('HEXCOORDINATES', String(hexCoordinates))
      console.log('HEXOUTLINE', hexOutline)

    } else {
      setIsValidHex(false)
    }

  }

  }

  const getHexCenterCoordinates = async (hex) => {
    const fetchedHex = await h3.h3ToGeo(hex)
    return fetchedHex
  }

  const getHexOutline = async (hex) => {
    const fetchedHex = await h3.h3SetToMultiPolygon([hex], true)
    return fetchedHex
  }

  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });


  return (
    <div className="mx-10 p-10 text-center">
    <input
      className="px-5 mb-2 text-center outline-none border-0 border-b-2 border-grey-dark text-gray-600"
      placeholder="Enter H3 Code"
      onChange={(e) => setCurrentHex(e.target.value)}
      value={currentHex}
      onKeyDown={handleKeyDown}>
    </input>
    {!isValidHex ? 
    <p className="text-red-300 text-xs">Please Enter A Valid Hex, e.g. "881f18b219fffff"</p>
  : null}

    <div >
        <div>
        <MapWithNoSSR className="min-w-full flex-1" zoom={13} h3Points={currentHexList} center={mapCenter} polygon={poly} hexes={totalHexes}/>
        </div>
    </div>
  </div>
  )
}
