
const h3 = require("h3-js"); 

export default async function fetchHexInfo(hex) {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const hexCenter = await h3.h3ToGeo(hex)
    const hexPolygon = await h3.h3SetToMultiPolygon([hex], true)
    const hexResolution = await h3.h3GetResolution(hex)
    const hexCity = await fetcher(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${hexCenter[0]}&longitude=${hexCenter[1]}&localityLanguage=en`)

    return {
        hex: hex,
        hexCity: hexCity.city.city,
        hexResolution: hexResolution,
        hexCenter: hexCenter,
        hexPolygon: hexPolygon
    }
  }