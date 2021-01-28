import {useState, useEffect} from 'react'


import dynamic from "next/dynamic";

import HexList from '../components/SearchHistory/HexList'
import HexInput from '../components/Header/HexInput'
import ClearHexesButton from '../components/Helpers/ClearHexesButton'
import LocationSearchInput from '../components/Header/SearchAddress'
import SwitchToggle from '../components/Helpers/SwitchToggle'

import Logo from '../icons/logo.svg';


export default function Home() {

  console.log('LOcal Env',process.env.NEXT_PUBLIC_GOOGLE_API_KEY)


  const [mapCenter, setMapCenter] = useState({lat: 51.312801, lng: 9.481544});
  const [totalHexes, setTotalHexes] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);

  function switchHex(hex) {

    setMapCenter({...mapCenter, lat: hex.hexCenter[0], lng: hex.hexCenter[1]})
        
  }

  useEffect(() => {
    const hexes = localStorage.getItem('selected-hexes')
    if (hexes) {
      setTotalHexes(JSON.parse(hexes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selected-hexes', JSON.stringify(totalHexes));

  })

  const MapWithNoSSR = dynamic(() => import("../components/Map/Map"), {
    ssr: false
  });

  return (
    <div className="h-screen  bg-gray-100">
    <div className="flex flex-col min-h-full">
    <img className="flex m-3 ml-5 h-14 absolute" src={Logo} alt="React Logo" />
      <div className="flex w-4/5 h-20 justify-center items-center">
        <div className="flex justify-center items-center">
        <div className="flex m-3">
        <span className={`flex mr-3 text-lg font-semibold ${switchValue ? 'text-gray-500' : 'text-blue-500'}`}>H3 Code</span>
          <SwitchToggle switchValue={switchValue} setSwitchValue={setSwitchValue} />
          <span className={`flex ml-3 text-lg font-semibold ${switchValue ? 'text-blue-500' : 'text-gray-500'}`}>Address</span>
        </div>
      {switchValue ?
        <LocationSearchInput totalHexes={totalHexes} mapCenter={mapCenter} setTotalHexes={setTotalHexes} setMapCenter={setMapCenter}></LocationSearchInput>
      : 
      <div className="flex">
      <HexInput totalHexes={totalHexes} mapCenter={mapCenter} setTotalHexes={setTotalHexes} setMapCenter={setMapCenter}/>
      </div>}
    </div>
    </div>
    <div className="flex z-1" >
      <div className="h-screen w-4/5 z-1">
      <MapWithNoSSR className="absolute z-1" center={mapCenter} hexes={totalHexes}/>
      </div>
      <div className="flex flex-col w-1/5 bg-white-400">
        <div className="flex flex-row justify-between items-center">
          <h2 className="mx-3 text-xl font-semibold">Recently Viewed</h2>
          <ClearHexesButton setTotalHexes={setTotalHexes}/>
        </div>
        <hr className="mb-1 mx-3 border-grey border-1"></hr> 
        <HexList className="flex flex-col" hexes={totalHexes} switchHex={switchHex}/>
      </div>
    </div>

  </div>
  </div>
  )
}


