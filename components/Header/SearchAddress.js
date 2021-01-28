import  React, {useState} from  'react'
import Autocomplete from 'react-google-autocomplete';

const h3 = require("h3-js");

import getPositionFromAddress from '../../helpers/getPositionFromAddress'
import fetchHexInfo from '../../helpers/h3API'

const LocationSearchInput = ({ setTotalHexes, setMapCenter, mapCenter }) => {

  const handleSelect = async (place) => {
    console.log('Address', place)
    const coordinates = await getPositionFromAddress(place)
    console.log('Coordinates', coordinates)
    const currentHex = await h3.geoToH3(coordinates[0], coordinates[1], 10);

    const hexInfo = await fetchHexInfo(currentHex)

    setTotalHexes(totalHexes => [...totalHexes, hexInfo])

    setMapCenter({...mapCenter, lat: hexInfo.hexCenter[0], lng: hexInfo.hexCenter[1]})
  }

  return (
    <div className="flex mx-10 p-10 text-center justify-center">
    <Autocomplete
        className="px-5 py-2 text-lg text-left outline-none rounded-xl border-2 border-blue-500 text-gray-500 font-semibold"
        apiKey="AIzaSyCUIscbavHMUZBib-lfpxgs0mZdR2NtMSA"
        onPlaceSelected={(place) => {
          console.log(place?.formatted_address, place);
          handleSelect(place)
        }}
        types={['address']}
        placeholder="Enter A Valid Address"
    />
  </div>
);
  }
export default LocationSearchInput;