import { ajax } from "../tools/ajax";

export const getCities = async (countryCode) => {
  const optionsRequest = {
    method: "GET",
    url: "https://spott.p.rapidapi.com/places",
    headers: {
        'X-RapidAPI-Key': 'ee2397b077msh372891d083a5ee2p19f48ajsn0ee625601dbb',
    'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    },
    params: {
      limit: 100,
      type: "CITY",
      country: countryCode ?? "US",
    },
  };
  return await ajax(optionsRequest);
};
