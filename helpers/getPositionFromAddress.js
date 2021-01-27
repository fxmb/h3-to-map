import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCUIscbavHMUZBib-lfpxgs0mZdR2NtMSA");

export default async function getPositionFromAddress(place) {

    const address = place.formatted_address || place.name

    const response = await Geocode.fromAddress(address)

    const { lat, lng } = response.results[0].geometry.location;
    return [lat, lng]
      
}