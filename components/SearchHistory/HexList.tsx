import React from 'react'

import HexListItem from './HexListItem'

export default function HexList ({hexes, resetMapCenter}) {

    return (
        <div className="flex flex-col h-4/5 w-full overflow-auto">
        {hexes.map((hex, idx) => (
            <HexListItem key={idx} hex={hex} resetMapCenter={resetMapCenter} />
        ))}
        </div>
    )
}