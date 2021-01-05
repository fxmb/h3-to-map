import {useState, useEffect} from 'react'


import dynamic from "next/dynamic";

import HexList from '../components/HexList'
import HexInput from '../components/HexInput'
import fetchHexInfo from '../helpers/h3API'

export default function Home() {


  const [mapCenter, setMapCenter] = useState({lat: 51.312801, lng: 9.481544});
  const [totalHexes, setTotalHexes] = useState([]);






  function switchHex(hex) {

    setMapCenter({...mapCenter, lat: hex.hexCenter[0], lng: hex.hexCenter[1]})
        
  }

  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <div className="h-screen">
    <div className="flex flex-col min-h-full">
      
    <HexInput totalHexes={totalHexes} mapCenter={mapCenter} setTotalHexes={setTotalHexes} setMapCenter={setMapCenter}/>

    <div className="flex" >
      <div className="h-screen w-4/5">
        <MapWithNoSSR center={mapCenter} hexes={totalHexes}/>
      </div>
      <div className="flex flex-col w-1/5 bg-white-400">
        <h2 className="mx-3 text-xl font-semibold">Recently Viewed</h2>
        <hr className="mb-1 mx-3 border-grey border-1"></hr> 
        <HexList className="flex flex-col" hexes={totalHexes} switchHex={switchHex}/>
      </div>
    </div>
  </div>
  </div>
  )
}
