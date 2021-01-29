import React from 'react'

import HexListItem from './HexListItem'

export default function HexList ({hexes, resetMapCenter, addHex}) {

    return (
        <div className="flex flex-col h-screen w-full overflow-auto">
        {hexes
        .sort((hexA, hexB) => hexA.hexResolution > hexB.hexResolution ? 1 : -1)
        .map((hex, idx) => (
            <HexListItem key={idx} hex={hex} addHex={addHex} resetMapCenter={resetMapCenter} />
        ))}
        </div>
    )
}