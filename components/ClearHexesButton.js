import React from 'react'

export default function ClearHexes ({setTotalHexes}) {

    function clearHexes() {
        setTotalHexes(() => []);
        localStorage.clear();
    }

    return (
    <button
        className="flex mx-5 my-2 p-2 bg-red-400 text-white text-xs rounded-xl outline-none font-semibold"
        onClick={() => clearHexes()}
        >
            Clear
    </button>
    )
}