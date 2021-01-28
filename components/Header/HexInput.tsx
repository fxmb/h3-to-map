import {useState, useEffect} from 'react'
import { Transition } from '@headlessui/react'

const h3 = require("h3-js");

import fetchHexInfo from '../../helpers/h3API'

export default function HexInput ({totalHexes, addHex, resetMapCenter, mapCenter }) {

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

          addHex(hexInfo)
          setCurrentHex("")

          resetMapCenter(hexInfo)
        } 
        
        else {
          setIsValidHex(false)
          setTimeout(() => setIsValidHex(true), 3000);
        }
    }
  }

    return(

      <div className="flex mx-10 p-10 text-center items-center justify-between">
      <input
        className="px-5 py-2 text-lg text-left outline-none rounded-xl border-2 border-blue-500 text-gray-500 font-semibold"
        placeholder="Enter H3 Code"
        onChange={(e) => setCurrentHex(e.target.value)}
        value={currentHex}
        onKeyDown={handleKeyDown}>
      </input>
      {!isValidHex ?
            <Transition
            show={true}
            className="absolute p-2 ml-72 z-100 text-white bg-red-400 text-s rounded-lg"
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
      className="absolute p-2 ml-72 z-100 text-white bg-blue-500 text-s rounded-lg"
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