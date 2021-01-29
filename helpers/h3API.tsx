
const h3 = require("h3-js"); 

import { Hex } from '../types/index';
import { fillColors } from '../static/fillColors'

export async function fetchHexInfo(hex: string, address?: string) : Promise<Hex> {

    //const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const hexData = await Promise.all([
        h3.h3ToGeo(hex),
        h3.h3SetToMultiPolygon([hex], true),
        h3.h3GetResolution(hex)
    ])

    const mapConfig = fillColors.find((element) => element.resolution == hexData[2])

    return {
        hex: hex,
        hexCenter: hexData[0],
        hexPolygon: hexData[1],
        hexResolution: hexData[2],
        hexColorCode: mapConfig.colorCode,
        hexColor: mapConfig.color,
        hexZoom: mapConfig.zoom,
        hexAddress: address
    }
  }

export async function fetchHexParent(hex) : Promise<Hex> {

    //const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const parentHex = await h3.h3ToParent(hex.hex, hex.hexResolution - 1)

    if (parentHex) {
        return fetchHexInfo(parentHex, hex.hexAddress)
    }
  }