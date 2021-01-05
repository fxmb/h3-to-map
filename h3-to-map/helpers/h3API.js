const h3 = require("h3-js");

export default async function fetchHexInfo(hex) {
    const hexCenter = await h3.h3ToGeo(hex)
    const hexPolygon = await h3.h3SetToMultiPolygon([hex], true)
    
    return {
        hex: hex,
        hexCenter: hexCenter,
        hexPolygon: hexPolygon
    }
  }