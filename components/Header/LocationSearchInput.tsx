import  React, {useState} from  'react'
import Autocomplete from 'react-google-autocomplete';

const h3 = require("h3-js");

import getCoordinatesFromAddress from '../../helpers/getCoordinatesFromAddress'
import {fetchHexInfo} from '../../helpers/h3API'

const LocationSearchInput = ({ addHex, resetMapCenter }) => {

  const handleSelect = async (place: { formatted_address: any; name: any; }) => {

    const address  = place.formatted_address || place.name

    const coordinates = await getCoordinatesFromAddress(address)

    const currentHex = await h3.geoToH3(coordinates[0], coordinates[1], 10);

    const hexInfo = await fetchHexInfo(currentHex, address)
    console.log('Fetched Hex', hexInfo)
    addHex(hexInfo)
    resetMapCenter(hexInfo)
  }

  return (
    <div className="flex mx-10 p-10 text-center justify-center">
    <Autocomplete
        className="px-5 py-2 text-lg text-left outline-none rounded-xl border-2 border-blue-500 text-gray-500 font-semibold"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={(place) => {
          handleSelect(place)
        }}
        types={['address']}
        placeholder="Enter A Valid Address"
    />
  </div>
);
  }
export default LocationSearchInput;