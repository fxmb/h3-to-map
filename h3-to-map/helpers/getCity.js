import Geocode from "react-geocode";

export default fetcher = (...args) => fetch(...args).then((res) => res.json());