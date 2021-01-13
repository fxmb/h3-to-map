import {useState, useEffect} from 'react'
import { Transition } from '@headlessui/react'

const h3 = require("h3-js");

import fetchHexInfo from '../helpers/h3API'


export default function HexInput ({totalHexes, setTotalHexes, setMapCenter, mapCenter }) {

  const [currentHex, setCurrentHex] = useState("");
  const [isValidHex, setIsValidHex] = useState(true);
  const [isNewHex, setIsNewHex] = useState(true);

  const handleKeyDown = async (event) => {
    if(event.key === 'Enter') {

        if( h3.h3IsValid(currentHex) ){

          if(totalHexes?.filter((hex) => hex.hex === currentHex).length > 0) {
            setIsNewHex(false)
            setCurrentHex("")
            setTimeout(() => setIsNewHex(true), 3000);
            return;
          }
          setIsValidHex(true)
          setIsNewHex(true)

          const hexInfo = await fetchHexInfo(currentHex)

          setTotalHexes(totalHexes => [...totalHexes, hexInfo])
          setCurrentHex("")
          setMapCenter({...mapCenter, lat: hexInfo.hexCenter[0], lng: hexInfo.hexCenter[1]})
        } 
        
        else {
          setIsValidHex(false)
          setTimeout(() => setIsValidHex(true), 3000);
        }
    }
  }


    // return(

    //     <div className="flex mx-10 p-10 text-center justify-center">
    //     <input
    //       className="px-5 mb-2 text-xl text-center outline-none border-0 border-b-2 border-grey-dark text-gray-600"
    //       placeholder="Enter H3 Code"
    //       onChange={(e) => setCurrentHex(e.target.value)}
    //       value={currentHex}
    //       onKeyDown={handleKeyDown}>
    //     </input>
    //     {!isValidHex ?
    //     <p className="absolute p-1 mt-10 text-white bg-red-400 text-s rounded-lg">Please Enter A Valid Hex, e.g. "881f18b219fffff"</p>
    //     : !isNewHex ? 
    //     <p className="absolute p-1 mt-10 text-white bg-blue-500 text-s rounded-lg">This hex ID already is in your history</p>
    //     : null}
    //   </div>

    // )

    return(

      <div className="flex mx-10 p-10 text-center justify-center">
      <input
        className="px-5 mb-2 text-xl text-center outline-none border-0 border-b-2 border-grey-dark text-gray-600"
        placeholder="Enter H3 Code"
        onChange={(e) => setCurrentHex(e.target.value)}
        value={currentHex}
        onKeyDown={handleKeyDown}>
      </input>
      {!isValidHex ?
            <Transition
            show={!isValidHex}
            className="absolute p-1 mt-10 text-white bg-red-400 text-s rounded-lg"
            as="p"
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-800"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            Please Enter A Valid Hex, e.g. "881f18b219fffff"
          </Transition>
      : !isNewHex ? 
      <Transition
      show={!isNewHex}
      className="absolute p-1 mt-10 text-white bg-blue-500 text-s rounded-lg"
      as="p"
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-800"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      This hex ID already is in your history
    </Transition>
      : null}
    </div>

  )
}