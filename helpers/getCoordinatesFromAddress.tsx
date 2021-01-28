import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

export default async function getCoordinatesFromAddress(address) : Promise<Array<number>> {

    const response = await Geocode.fromAddress(address)

    const { lat, lng } = response.results[0].geometry.location;
    return [lat, lng]
      
}