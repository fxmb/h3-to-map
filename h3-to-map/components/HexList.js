import React from 'react'

import HexListItem from './HexListItem'

export default function HexList ({hexes, switchHex}) {
    console.log("HEXESSSSS", hexes)
    return (
        <div className="flex flex-col w-full">
        {hexes.map((hex, idx) => (
            <HexListItem key={idx} hex={hex} switchHex={switchHex} />
        ))}
        </div>
    )
}