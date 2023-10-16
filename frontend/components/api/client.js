import axios from "axios";

const client = axios.create({
  baseURL: "http://10.188.201.241:3000/api",
});

// const client = axios.create({
//   baseURL: "https://plasticaway.ew.r.appspot.com/api",
// });

export default client;
