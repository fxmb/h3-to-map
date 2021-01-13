import React from 'react'

export default function ClearHexes ({setTotalHexes}) {

    function clearHexes() {
        setTotalHexes(() => []);
        localStorage.clear();
    }

    return (
    <button
        className="m-2 p-1 px-2 bg-red-400 text-white rounded-lg outline-none"
        onClick={() => clearHexes()}
        >
            Clear
    </button>
    )
}