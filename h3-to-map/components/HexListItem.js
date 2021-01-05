import React from 'react'

export default function HexListItem ( {hex, switchHex} ) {

    return (
        <div 
            className="p-2 mx-3 mb-1 flex flex-col rounded-lg shadow-lg cursor-pointer"
            onClick={() => switchHex(hex)}>
            <div className="flex flex-row justify-between">
                <span className="text-lg font-bold">{hex.hex}</span>
                <span className="text-l font-semi-bold">Res {hex.hexResolution}</span>

            </div>
            <div className="flex flex-col ml-5 justify-items-start">
                <div className="flex flex-row items-center text-sm">
                    <span className="mr-3 text-gray-400 font-bold">Lat</span>
                    <span className="text-blue-500 text-l">{parseFloat(hex.hexCenter[0]).toFixed(6)}</span>
                </div>
                <div className="flex flex-rowitems-center text-sm">
                    <span className="mr-2 text-gray-400 font-bold">Lng</span>
                    <span className=" text-blue-500 text-l">{parseFloat(hex.hexCenter[1]).toFixed(6)}</span>
                </div>
            </div>
        </div>
    )
    
}