import React from 'react'

import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function HexListItem ( {hex, resetMapCenter} ) {

    //console.log(hex['hexResolutionColour'](hex))

    return (
        <div 
            className="p-2 mx-3 mb-1 flex flex-col rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
            onClick={() => resetMapCenter(hex)}>
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-bold">{hex.hex}</span>
                <span className={`m-2 text-${hex.hexColor} text-sm font-bold`}>Res {hex.hexResolution}</span>
            </div>
            <hr className="mb-1 mx-3 border-green border-3"></hr> 

            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-col ml-3 justify-items-start">
                    <div className="flex flex-row items-center text-sm">
                        <span className="mr-3 text-gray-400 font-bold">Lat</span>
                        <span className="text-blue-500 text-l">{parseFloat(hex.hexCenter[0]).toFixed(6)}</span>
                    </div>
                    <div className="flex flex-rowitems-center text-sm">
                        <span className="mr-2 text-gray-400 font-bold">Lng</span>
                        <span className=" text-blue-500 text-l">{parseFloat(hex.hexCenter[1]).toFixed(6)}</span>
                    </div>

                </div>
                <CopyToClipboard text={`${hex.hexCenter[0]} ${hex.hexCenter[1]}`}>
                    <span className="flex ml-4 mx-2 my-2 p-2 text-white bg-gray-400 text-xs rounded-xl font-semibold justify-center items-center">Copy</span>
                    </CopyToClipboard>

            </div>
            <div className="flex justify-between mt-2 items-end ml-3 text-gray-400 text-sm font-bold">
                    <span>{hex.hexAddress && `${hex.hexAddress.substring(0,35)}${hex.hexAddress.length > 35 ? '...' : ''}`}</span>
                   
            </div>
        </div>
    )
    
}