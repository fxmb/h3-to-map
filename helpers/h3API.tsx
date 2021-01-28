
const h3 = require("h3-js"); 

import { Hex } from '../types/index';

export default async function fetchHexInfo(hex: string) : Promise<Hex> {

    //const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const hexData = await Promise.all([
        h3.h3ToGeo(hex),
        h3.h3SetToMultiPolygon([hex], true),
        h3.h3GetResolution(hex)
    ])

    return {
        hex: hex,
        hexCenter: hexData[0],
        hexPolygon: hexData[1],
        hexResolution: hexData[2],
    }
  }