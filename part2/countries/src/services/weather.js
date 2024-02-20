import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const API_KEY = "88dece66efb9efd22821cdd2fd6ce5df";

const getWeather = (lat, lng) => {
  return axios.get(
    `${baseUrl}lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  );
};

export default { getWeather };
