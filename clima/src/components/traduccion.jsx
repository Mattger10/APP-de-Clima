const getWeatherDescription = (description) => {
    switch (description) {
      case "clear sky":
        return "Cielo despejado";
      case "cloudy":
        return "Nublado";
      case "broken clouds":
        return "Parcialmente nublado";
      case "moderate rain":
        return "Lluvia moderada";
      case "overcast clouds":
        return "Nublado";
      case "fog":
        return "Neblina";
      case "light rain":
        return "Lluvia ligera";
      case "light intensity drizzle":
        return "Llovizna con intensidad ligera";
      case "scattered clouds":
        return "Nubes dispersas";
      case "few clouds":
        return "Parcialmente despejado";
      default:
        return description;
    }
  };

  export default getWeatherDescription;