import Axios from "axios";

// Axios.defaults.withCredentials = true;

const APIConfig = Axios.create({
	baseURL: "https://brives-staging-backend.herokuapp.com",
	// baseURL: "http://localhost:8080", 
});

export default APIConfig;
